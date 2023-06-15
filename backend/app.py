from flask_cors import CORS

from flask import Flask
from api.thinkgpt import thinkgpt_bp
from api.chat import chat_bp
from api.story import story_bp
app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
app.register_blueprint(chat_bp, url_prefix = "/chat")
app.register_blueprint(thinkgpt_bp, url_prefix = "/thinkgpt")
app.register_blueprint(story_bp, url_prefix = "/story")


