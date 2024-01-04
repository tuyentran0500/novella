from langchain.chains.mapreduce import MapReduceChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import ReduceDocumentsChain, MapReduceDocumentsChain
from langchain.chat_models import ChatOpenAI
from langchain.chains.llm import LLMChain
from pymongo import MongoClient
from langchain.prompts.prompt import PromptTemplate
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.document_loaders.mongodb import MongodbLoader
import os
from langchain.docstore.document import Document
client = MongoClient(os.getenv('DATABASE_URL'))

db = client['novella']
storyCollection = db['story']

class NovellaSummarizationChain():
    """Memory class for summarizing long chapters"""
    map_reduce_chain: LLMChain
    split_docs: []
    response: str
    def __init__(self):
        client = MongoClient(os.getenv('DATABASE_URL'))
        db = client['novella']
        storyCollection = db['story']
        doc = storyCollection.find_one({})['chapters']
        # Extract known information about chapters, if they exist.
        docs = [Document(page_content=item.get('content', '')) for item in doc]
        print(docs)
        # Extract known information about chapters, if they exist.
        llm = ChatOpenAI(temperature=0.0, model_name="gpt-3.5-turbo-16k", openai_api_key=os.getenv('OPEN_API_KEY'))
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
        (Within 1000 characters)
        Helpful Answer:"""
        reduce_prompt = PromptTemplate.from_template(reduce_template)
        reduce_chain = LLMChain(llm=llm, prompt=reduce_prompt)

        combine_documents_chain = StuffDocumentsChain(
            llm_chain=reduce_chain, document_variable_name="docs"
        )

        reduce_documents_chain = ReduceDocumentsChain(
            combine_documents_chain=combine_documents_chain,
            collapse_documents_chain=combine_documents_chain,
            token_max=4000,
        )
        self.map_reduce_chain = MapReduceDocumentsChain(
            llm_chain=map_chain,
            reduce_documents_chain=reduce_documents_chain,
            document_variable_name="docs",
            return_intermediate_steps=False,
        )
        text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=1000, chunk_overlap=0
        )
        self.split_docs = text_splitter.split_documents(docs)
        print(self.split_docs)
        self.response = self.map_reduce_chain.run(self.split_docs)
    def run(self):
        return self.response


