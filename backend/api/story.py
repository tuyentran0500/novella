from flask import Blueprint,request
import os
import openai
from pymongo import MongoClient
import json

openai.api_key = os.getenv('NOVELLA_API_KEY')
openai.api_base = os.getenv('NOVELLA_API_BASE')
story_bp = Blueprint('story', __name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['novella']
storyCollection = db['story']

@story_bp.route('/brainstorm', methods=['GET'])
def getBrainstorming():
    content = storyCollection.find_one({})['summary']
    return {"content": content, "role" : "assistant"}, 200

@story_bp.route('/brainstorm', methods=['POST'])
def brainstorming():
    data = request.get_json()
    content = data['content']
    content = ", ".join(content)
    content = "Suggest me a story idea with the following genres " + content
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role" : "system", "content" : "You are an helpful assistant"},
            {"role": "user", "content": content}
        ]
    )
    return {"content": response.choices[0].message.content, "role" : "assistant"}, 200

@story_bp.route('/brainstorm-confirm', methods=['POST'])
def confirmBrainstormIdea():
    data = request.get_json()
    content = data['content']
    storyCollection.update_one({}, {
        "$set": {
            "summary" : content
        }
    })
    
    return {"content": "Succeed!", "role" : "system"}, 200

@story_bp.route('/outline', methods=['GET'])
def outline():
    summary = storyCollection.find_one({})['summary']
    content = "With the following idea:" + summary + "\n"
    content += "Suggest an outline in the following format: ``` [ { \"title\" : \"\", \"description\": \"\"]```"
    messages = [{"role": "user", "content": content}]
    print(messages)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    response = response.choices[0].message.content
    response = response.split("```")
    print(response)
    outlineList = response[0].strip()
    outlineList = json.loads(outlineList)

    return {"content": outlineList, "role" : "system"}, 200