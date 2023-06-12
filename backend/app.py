import os

import openai
from flask_cors import CORS

from flask import Flask, request
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['novella']
openai.api_key = "Dd77ClpEzlMvbFJ2mp0b35-mPXwtlG6FEuBXDIsTssnV3sCr11vCS0XHO8K2Wrou-86DNHQ0L0oo5h1iuDb5j6Q"
openai.api_base = "https://api.openai.iniad.org/api/v1"

def getChatHistoryById(id = ""):
    chatCollection = db['chat']
    if (id == ''):
        return chatCollection.find_one()['memory']
    else:
        return chatCollection.find({"_id": id})['memory']
    
@app.route("/chat", methods=["GET"])
def getChatHistory(id = ""):
    result = getChatHistoryById(id)
    print("Document:", result)
    return {"memory": result}, 200


@app.route("/chat", methods=["POST"])
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


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )
