import os

import openai
from flask_cors import CORS

from flask import Flask, request

app = Flask(__name__)
cors = CORS(app)
openai.api_key = "Dd77ClpEzlMvbFJ2mp0b35-mPXwtlG6FEuBXDIsTssnV3sCr11vCS0XHO8K2Wrou-86DNHQ0L0oo5h1iuDb5j6Q"
openai.api_base = "https://api.openai.iniad.org/api/v1"

@app.route("/chat", methods=("GET", "POST"))
def index():
    if (request.method == 'POST'):
        data = request.get_json()
        content = data['content']
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": content},
                ]
            )
        print(response)
        return {"content": response.choices[0].message.content}, 200


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
