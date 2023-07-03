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
    outlineList = getOutlineStoryList(summary=content)
    storyCollection.update_one({}, {
        "$set": {
            "summary" : content,
            "chapters" : outlineList,
        }
    })
    
    return {"content": "Succeed!", "role" : "system"}, 200

def getOutlineStoryList(summary):
    content = "With the following idea:" + summary + "\n"
    content += "Suggest an outline in the following format: ``` [ { \"title\" : \"\", \"description\": \"\"]```"
    messages = [{"role": "user", "content": content}]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    response = response.choices[0].message.content
    response = response.split("```")
    outlineList = response[0].strip()
    outlineList = json.loads(outlineList)
    return outlineList
@story_bp.route('/outline', methods=['GET'])
def getOutline():
    outlineList = storyCollection.find_one({})['chapters']
    return {"content": outlineList, "role" : "system"}, 200

@story_bp.route('/writing', methods=['POST'])
def chapterWriting():
    summary = storyCollection.find_one({})['summary']
    data = request.get_json()
    content = "Write an chapter based on the following description and the summary above: "
    content += data['title'] + " " + data['description']
    content += ". Also, do not include the title of the chapter"

    messages = [
        {"role": "user", "content": summary},
        {"role": "user", "content": content}
    ]
    print(messages)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    data["content"] = response.choices[0].message.content
    return data, 200

def rewriteChapterDescription(data):
    content = data['content']
    content = "Rewrite this chapter description based on the content: " + content + "."
    content += "Also, write this within 3 setences and do not include the chapter title" 
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role" : "system", "content" : "You are an helpful assistant"},
            {"role": "user", "content": content}
        ]
    )
    data['description'] = response.choices[0].message.content
    return data

@story_bp.route('/save-chapter', methods=['POST'])
def saveChapter():
    data = request.get_json()
    chapters = storyCollection.find_one({})['chapters']
    data = rewriteChapterDescription(data)
    print(data)
    chapters[data['index']] = data
    storyCollection.update_one({}, {
        "$set": {
            "chapters" : chapters,
        }
    })
    return {"content": chapters, "role" : "system"}, 200
    


    