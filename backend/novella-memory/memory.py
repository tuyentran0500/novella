from langchain import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate

from langchain.schema import BaseMemory
from pydantic import BaseModel
from typing import List, Dict, Any
from pymongo import MongoClient
import os

client = MongoClient('mongodb://localhost:27017/')
db = client['novella']
storyCollection = db['story']
class NovellaStoryMemory(BaseMemory, BaseModel):
    """Memory class for storing information about entities."""

    # Define dictionary to store information about entities.
    chapters: dict = {}
    # Define key to pass information about chapters into prompt.
    memory_key: str = "entities"

    def clear(self):
        self.chapters = {}

    @property
    def memory_variables(self) -> List[str]:
        """Define the variables we are providing to the prompt."""
        return [self.memory_key]

    def load_memory_variables(self, inputs: Dict[str, Any]) -> Dict[str, str]:
        """Load the memory variables, in this case the entity key."""
        # Get the story input
        doc = storyCollection.find_one({})['chapters']
        # Extract known information about chapters, if they exist.
        chapters = [item.get('content', '') for item in doc]
        print(chapters)
        # Return combined information about chapters to put into context.
        return {self.memory_key: "\n".join(chapters)}
    def save_context(self, inputs: Dict[str, Any], outputs: Dict[str, str]) -> None:
        """Save context from this conversation to buffer."""
        # Get the input text and run through spacy
        pass
