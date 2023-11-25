from flask import Blueprint,request
import os
from novellamemory.novellaGPT import NovellaGPT
from pymongo import MongoClient
import json
import requests
import base64
from openai import OpenAI

story_bp = Blueprint('story', __name__)
client = MongoClient(os.getenv('DATABASE_URL'))
clientAI = OpenAI(api_key=os.getenv('NOVELLA_API_KEY'), base_url=os.getenv('NOVELLA_API_BASE'))

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
    response = clientAI.chat.completions.create(
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
    db['chat'].update_one({}, {
        "$set": {
            "chapters": [{
                "memory": [
                    {"role": "system", "content": "We are writing a story with an overall summary: " + content},
                    {"role": "system", "content": "You are brainstorming for a chapter with a summary: " + chapter['description']}
                ],
                "summary": chapter["description"],
                "title": chapter["title"]
            } for chapter in outlineList]
        }
    })

    
    return {"content": "Succeed!", "role" : "system"}, 200

def getOutlineStoryList(summary):
    content = "With the following idea:" + summary + "\n"
    content += "Suggest an outline chapters in the following format: ``` [ { \"title\" : \"\", \"description\": \"\", \"index\": number}]``` with index start from 0."
    messages = [{"role": "user", "content": content}]
    response = clientAI.chat.completions.create(
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

def getStoryProgress(chapterIndex):
    chapters = storyCollection.find_one({})['chapters']
    summary = ""
    for index in range(len(chapters)):
        summary += chapters[index]['description']
    return summary
def getContentBlock(data):
    return str([
            {
                "id": "title",
                "type": "heading",
                "props": {
                    "textColor": "default",
                    "backgroundColor": "default",
                    "textAlignment": "left",
                    "level": "3"
                },
                "content": [
                    {
                        "type": "text",
                        "text": data["title"],
                        "styles": {}
                    }
                ],
            },
            {
                "id": "content",
                "type": "paragraph",
                "props": {
                    "textColor": "default",
                    "backgroundColor": "default",
                    "textAlignment": "left"
                },
                "content": [
                    {
                        "type": "text",
                        "text": data["content"],
                        "styles": {}
                    }
                ],
                "children": []
            },
        ])
@story_bp.route('/writing', methods=['POST'])
def chapterWriting():
    data = request.get_json()
    print("Print Data:", data)
    storySummary = storyCollection.find_one({})['summary']
    summary = getStoryProgress(int(data['index']))
    content = "Write a chapter continue the story based on the following description: "
    content += data['description']
    content += ". With this title:" + data['title']
    messages = [
        {"role": "system", "content": "Imagine that you are a master novel writer"},
        {"role": "assistant", "content": storySummary},
        {"role": "assistant", "content": summary},
        {"role": "user", "content": content}
    ]
    print(messages)
    clientAPI = OpenAI(api_key=os.getenv("OPEN_API_KEY"))

    response = clientAPI.chat.completions.create(
        model="ft:gpt-3.5-turbo-1106:personal::8Mx3v9oF",
        messages=messages
    )
    data["content"] = response.choices[0].message.content
    # data["contentBlock"] = getContentBlock(data)
    return data, 200

@story_bp.route('/improve', methods=['POST'])
def improveSelectedText():
    data = request.get_json()
    content = "Based on the context of the chapter: "
    content += data['description'] + ". "
    content += "Add a little more detail to the following pararaph: " + data['content']
    # content += ". Knowing that this is the content before the text:\n " + data['before']
    # content += "\n And that this is the content after the text: " + data['after']


    messages = [
        {"role": "system", "content": "Imagine that you are a master novel writer"},
        # {"role": "assistant", "content": summary},
        {"role": "user", "content": content}
    ]
    print(messages)
    response = clientAI.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    result = {}
    result["content"] = response.choices[0].message.content
    return result, 200

def rewriteChapterDescription(data):
    content = data['content']
    content = "Rewrite this chapter description based on the content: " + content + "."
    content += "Also, write this within 3 setences and do not include the chapter title" 
    response = clientAI.chat.completions.create(
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
    


@story_bp.route('/generate-image', methods=['POST'])
def create_cover_image():
    data = request.get_json()
    plot = data['plot']

    engine_id = "stable-diffusion-xl-beta-v2-2-2"
    api_host = os.getenv('API_HOST', 'https://api.stability.ai')
    api_key = os.getenv("NOVELLA_DRAWING_API_KEY")

    if api_key is None:
        raise Exception("Missing Stability API key.")

    response = requests.post(
        f"{api_host}/v1/generation/{engine_id}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": plot
                }
            ],
            "cfg_scale": 7,
            "clip_guidance_preset": "FAST_BLUE",
            "height": 512,
            "width": 512,
            "samples": 1,
            "steps": 10,
        },
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    folder_name = "content"
    folder_path = os.path.join(os.getcwd(), folder_name)

    data = response.json()

    for i, image in enumerate(data["artifacts"]):
        with open(os.path.join(folder_path, "cover.png"), "wb") as f: # replace this if running locally, to where you store the cover file
            f.write(base64.b64decode(image["base64"]))
    return {"content": "Success", "role" : "system"}, 200

@story_bp.route("/review", methods=["POST"])
def getReviewStory():
    data = request.get_json()
    chat = NovellaGPT()
    summaryResponse = chat.predict("Please analyze the cohesion of the story I've written. Check for repetitiveness between these chapters, ensuring that there is no redundant information or duplicated events, logical flow, and coherence between sentences and paragraphs. Ensure that the plot progresses smoothly and the events are connected logically. Pay attention to the consistency in character descriptions and actions. Look out for any inconsistencies or gaps in the storyline. Additionally, assess the overall readability and engagement factor of the narrative. Provide feedback on how well the story holds together and suggest improvements where necessary. Additionally, please provide an overall score for the story, considering its coherence, flow, character development, and engagement. (within 400 characters)")
    # summaryResponse = chat.predict_with_large_text()
    chapterResponse = chat.predict_with_kg("Please review the chapter: " + str(data['title']) + ". Pay attention to how the narrative progresses, how well different elements are connected, the level of engagement it creates, and the language and style used by the author. Your review should offer detailed insights into the strengths and areas for improvement in these aspects. (within 400 character)", int(data['index']))
    print(summaryResponse)
    print(chapterResponse)
    # summaryResponse = "Hello"
    # chapterResponse = "In general this chapter was well-design, has good flows of paces."
    return {"summaryReview": summaryResponse,
            "chapterReview": chapterResponse,
             "role" : "assistant"}, 200