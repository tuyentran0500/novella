from flask_cors import CORS

from flask import Flask
from pymongo import MongoClient
# from api.thinkgpt import thinkgpt_bp
from api.chat import chat_bp
from api.story import story_bp
import os
client = MongoClient(os.getenv('DATABASE_URL'))
db = client['novella']

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
app.register_blueprint(chat_bp, url_prefix = "/chat")
# app.register_blueprint(thinkgpt_bp, url_prefix = "/thinkgpt")
app.register_blueprint(story_bp, url_prefix = "/story")


