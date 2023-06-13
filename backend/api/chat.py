
from flask import Blueprint, request
import os
import openai
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
chat_bp = Blueprint('chat', __name__)
db = client['novella']

openai.api_key = os.getenv('NOVELLA_API_KEY')
openai.api_base = os.getenv('NOVELLA_API_BASE')

def getChatHistoryById(id = ""):
    chatCollection = db['chat']
    if (id == ''):
        return chatCollection.find_one()['memory']
    else:
        return chatCollection.find({"_id": id})['memory']
    
@chat_bp.route("/", methods=["GET"])
def getChatHistory(id = ""):
    result = getChatHistoryById(id)
    print("Document:", result)
    return {"memory": result}, 200


@chat_bp.route("/", methods=["POST"])
def getChatResponse():
    data = request.get_json()
    content = data['content']
    messages = getChatHistoryById(id = '')
    messages.append({"role": "user", "content": content})
    print(messages)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
        )
    messages.append({"content": response.choices[0].message.content, "role" : "assistant"})
    db['chat'].update_one({}, { "$set": { "memory": messages } })

    return {"content": response.choices[0].message.content, "role" : "assistant"}, 200