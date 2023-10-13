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

def getBrainstormHistoryById(id = ""):
    chatCollection = db['chat']
    if (id == ''):
        return chatCollection.find_one()['brainstorm']['memory']
    else:
        return chatCollection.find({"_id": id})['brainstorm']['memory']

def getChapterBrainstormByTitle(title, id = ""):
    chapterHistory = getChapterHistoryById(id = "")
    selectedChapter = list(filter(lambda item: item["title"] == title, chapterHistory))[0]
    return chapterHistory, selectedChapter
def getChapterHistoryById(id = ""):
    chatCollection = db['chat']
    if (id == ''):
        return chatCollection.find_one()['chapters']
    else:
        return chatCollection.find({"_id": id})['chapters']
    

def summaryBrainstorm(messages, request = "Summary the story so far with title, detail story progress, divide the story into 4 acts.", ):
    # summary the story so far
    new_messages = messages + [{"content": request, "role" : "user"}]
    summaryResponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=new_messages,
    )
    return summaryResponse

@chat_bp.route("", methods=("GET", "POST"))
def getBrainstormResponse():
    messages = getBrainstormHistoryById(id = '')
    if request.method == 'GET':
        return {
            "memory": messages, 
            "summary": db['chat'].find_one()['brainstorm']['summary'],
            "chapters": db['chat'].find_one()['chapters']
            }, 200
    data = request.get_json()
    content = data['content']
    messages.append({"role": "user", "content": content})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
        )
    messages.append({"content": response.choices[0].message.content, "role" : "assistant"})
    db['chat'].update_one({}, { "$set": { "brainstorm.memory": messages } })
    # Add suggestion list
    messages.append({"content": "Suggest the next brainstorming step in less than 40 characters", "role" : "user"})
    suggestionResponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        n=4
    )
    suggestionList = [suggestionResponse.choices[i].message.content for i in range(4)]
    # Summary the story so far and save to db.
    summaryResponse = summaryBrainstorm(messages)
    db['chat'].update_one({}, { "$set": { "brainstorm.summary": summaryResponse.choices[0].message.content } })

    return {"content": response.choices[0].message.content, "role" : "assistant", "suggestionList" : suggestionList}, 200

def updateStorySummaryByChapter(selectedChapter):
    chapterHistory = db['story'].find_one({})['chapters']
    db['story'].update_one({}, { "$set": { "chapters": [{**chapter, "description": selectedChapter['summary']}  if chapter['title'] == selectedChapter['title'] else chapter for chapter in chapterHistory] } })

@chat_bp.route("/chapter", methods=("GET", "POST"))
def getChapterBrainstormResponse():
    data = request.get_json()
    chapterHistory, selectedChapter = getChapterBrainstormByTitle(data['title'])
    messages = selectedChapter['memory']

    content = data['content']
    messages.append({"role": "user", "content": content})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
        )
    messages.append({"content": response.choices[0].message.content, "role" : "assistant"})
    selectedChapter['memory'] = messages
    selectedChapter['summary'] = summaryBrainstorm(messages, request="Write a short description for this chapter.").choices[0].message.content
    db['chat'].update_one({}, { "$set": { "chapters": [selectedChapter if chapter['title'] == selectedChapter['title'] else chapter for chapter in chapterHistory] } })
    updateStorySummaryByChapter(selectedChapter)

    # Add suggestion list
    messages.append({"content": "Suggest the next brainstorming step for this chapter in less than 40 characters", "role" : "user"})
    suggestionResponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        n=4
    )
    # Summary the story so far and save to db.
    suggestionList = [suggestionResponse.choices[i].message.content for i in range(4)]
    return {"content": response.choices[0].message.content, "role" : "assistant", "suggestionList" : suggestionList, "summary": selectedChapter['summary']}, 200


# @chat_bp.route("", methods=("GET", "POST"))
# def getBrainstormResponse():
#     messages = getBrainstormHistoryById(id = '')
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