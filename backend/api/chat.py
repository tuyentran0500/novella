from flask import Blueprint, request
import os
import openai
from pymongo import MongoClient
from novellamemory.novellaGPT import NovellaGPT

chat_bp = Blueprint('chat', __name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['novella']

openai.api_key = os.getenv('NOVELLA_API_KEY')
openai.api_base = os.getenv('NOVELLA_API_BASE')

def getChatHistoryById(id = ""):
    chatCollection = db['chat']
    if (id == ''):
        return chatCollection.find_one()['memory']
    else:
        return chatCollection.find({"_id": id})['memory']
    

@chat_bp.route("", methods=("GET", "POST"))
def getChatResponse():
    messages = getChatHistoryById(id = '')
    if request.method == 'GET':
        return {"memory": messages}, 200
    data = request.get_json()
    content = data['content']
    messages.append({"role": "user", "content": content})
    print(messages)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
        )
    messages.append({"content": response.choices[0].message.content, "role" : "assistant"})
    db['chat'].update_one({}, { "$set": { "memory": messages } })

    return {"content": response.choices[0].message.content, "role" : "assistant"}, 200

# @chat_bp.route("", methods=("GET", "POST"))
# def getChatResponse():
#     messages = getChatHistoryById(id = '')
#     if request.method == 'GET':
#         return {"memory": messages}, 200
#     data = request.get_json()
#     content = data['content']
#     messages.append({"role": "user", "content": content})
#     chat = NovellaGPT()
#     response = chat.predict(content)
#     messages.append({"content": response, "role" : "assistant"})
#     db['chat'].update_one({}, { "$set": { "memory": messages } })

#     return {"content": response, "role" : "assistant"}, 200