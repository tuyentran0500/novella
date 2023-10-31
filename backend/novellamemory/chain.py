from langchain.chains.mapreduce import MapReduceChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import ReduceDocumentsChain, MapReduceDocumentsChain
from langchain.chat_models import ChatOpenAI
from langchain.chains.llm import LLMChain
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['novella']
storyCollection = db['story']

class NovellaSummarizationChain():
    """Memory class for summarizing long chapters"""
    map_reduce_chain: LLMChain
    split_docs: []
    def __init__(self):
        doc = storyCollection.find_one({})['chapters']
        # Extract known information about chapters, if they exist.
        docs = [item.get('content', '') for item in doc]
        llm = ChatOpenAI(temperature=0)
        map_template = """The following is a set of chapters
        {docs}

        Please provide a concise summary of the chapter's core content, focusing on the main events, actions, and significant plot points. 
        Helpful Answer:"""
        map_prompt = PromptTemplate.from_template(map_template)
        map_chain = LLMChain(llm=llm, prompt=map_prompt)
        # Reduce
        reduce_template = """The following is set of summaries of my story:
        {docs}
        Please analyze the cohesion of the story I've written. Check for repetitiveness between these chapters, 
        ensuring that there is no redundant information or duplicated events, logical flow, and coherence between sentences and paragraphs. 
        Ensure that the plot progresses smoothly and the events are connected logically. Pay attention to the consistency in character descriptions and actions. 
        Look out for any inconsistencies or gaps in the storyline. Additionally, assess the overall readability and engagement factor of the narrative. 
        Provide feedback on how well the story holds together and suggest improvements where necessary. Additionally, please provide an overall score for the story.
        Helpful Answer:"""
        reduce_prompt = PromptTemplate.from_template(reduce_template)
        # Run chain
        reduce_chain = LLMChain(llm=llm, prompt=reduce_prompt)

        # Takes a list of documents, combines them into a single string, and passes this to an LLMChain
        combine_documents_chain = StuffDocumentsChain(
            llm_chain=reduce_chain, document_variable_name="docs"
        )

        # Combines and iteravely reduces the mapped documents
        reduce_documents_chain = ReduceDocumentsChain(
            # This is final chain that is called.
            combine_documents_chain=combine_documents_chain,
            # If documents exceed context for `StuffDocumentsChain`
            collapse_documents_chain=combine_documents_chain,
            # The maximum number of tokens to group documents into.
            token_max=4000,
        )
        # Combining documents by mapping a chain over them, then combining results
        self.map_reduce_chain = MapReduceDocumentsChain(
            # Map chain
            llm_chain=map_chain,
            # Reduce chain
            reduce_documents_chain=reduce_documents_chain,
            # The variable name in the llm_chain to put the documents in
            document_variable_name="docs",
            # Return the results of the map steps in the output
            return_intermediate_steps=False,
        )

        text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=1000, chunk_overlap=0
        )
        self.split_docs = text_splitter.split_documents(docs)
    def run():
        self.map_reduce_chain.run(self.split_docs)


