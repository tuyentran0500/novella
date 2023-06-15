from flask import Blueprint,request
import os
import openai

openai.api_key = os.getenv('NOVELLA_API_KEY')
openai.api_base = os.getenv('NOVELLA_API_BASE')
story_bp = Blueprint('story', __name__)

@story_bp.route('/brainstorm', methods=['POST'])
def brainstorming():
    data = request.get_json()
    content = data['content']
    content = ", ".join(content)
    content = "Suggest me a story idea about " + content
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role" : "system", "content" : "You are an helpful assistant"},
            {"role": "user", "content": content}
        ]
    )

    return {"content": response.choices[0].message.content, "role" : "assistant"}, 200
