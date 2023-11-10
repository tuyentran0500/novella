from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
from novellamemory.memory import NovellaStoryMemory
import os

class NovellaGPT():
    llm: ChatOpenAI
    template: PromptTemplate
    conversation: ConversationChain
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0)
        print(os.getenv('NOVELLA_API_BASE'))
        print("API:", self.llm.openai_api_key)
        print("API_BASE:", self.llm.openai_api_base)

        self.template = """The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. You are provided with information about entities the Human mentions, if relevant.

        Relevant entity information:
        {entities}

        Conversation:
        Human: {input}
        AI:"""
        self.prompt = PromptTemplate(input_variables=["entities", "input"], template=self.template)
        self.conversation = ConversationChain(
            llm=self.llm, prompt=self.prompt, verbose=True, memory=NovellaStoryMemory()
        )
    def predict(self, input: str):
        return self.conversation.predict(input = input)
    
if __name__ == '__main__':
    gpt = NovellaGPT()
    result = gpt.predict("Could you cite all of chapter 1 content?")
    print(result)