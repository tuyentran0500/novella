from langchain import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
from langchain.memory import ConversationKGMemory, ConversationEntityMemory
from langchain.llms import OpenAI
from pymongo import MongoClient
from langchain.memory.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE
from novellamemory.memory import NovellaStoryMemory
# from novellamemory.chain import NovellaSummarizationChain

import os


client = MongoClient('mongodb://localhost:27017/')
db = client['novella']
storyCollection = db['story']

class NovellaGPT():
    llm: ChatOpenAI
    template: PromptTemplate
    conversation: ConversationChain
    conversation_with_kg: ConversationChain
    # chain: NovellaSummarizationChain
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0)
        print(os.getenv('NOVELLA_API_BASE'))
        print("API:", self.llm.openai_api_key)
        print("API_BASE:", self.llm.openai_api_base)

        self.template = """THis is a following story information of a writer.

        Relevant entity information:
        {entities}

        Conversation:
        Human: {input}
        AI:"""
        self.prompt = PromptTemplate(input_variables=["entities", "input"], template=self.template)
        self.conversation = ConversationChain(
            llm=self.llm, prompt=self.prompt, verbose=True, memory=NovellaStoryMemory()
        )

        ## Use of knowledge graph.
        llm = ChatOpenAI(temperature=0)
        memory = ConversationEntityMemory(llm=self.llm)

        self.conversation_with_kg = ConversationChain(
            llm=llm, prompt=ENTITY_MEMORY_CONVERSATION_TEMPLATE, verbose=True, memory=memory
        )
        # self.chain = NovellaSummarizationChain()

    def predict(self, input: str):
        return self.conversation.predict(input = input)
    def predict_with_kg(self, input: str, index: int):
        doc = storyCollection.find_one({})['chapters']
        for item in doc:
            if item.get('title', '') != '' and item.get('content', '') != '':
                self.conversation_with_kg.  memory.save_context({"input" : item.get('title', '')}, {"output" : item.get('description', '')})
        self.conversation_with_kg.memory.save_context({"input" : doc[index].get('title', '')}, {"output" : doc[index].get('content', '')})
        return self.conversation_with_kg.predict(input = input)
    # def predict_with_large_text(self):
    #     return self.chain.run()
if __name__ == '__main__':
    gpt = NovellaGPT()
    result = gpt.predict("Could you cite all of chapter 1 content?")
    print(result)