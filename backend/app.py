from flask_cors import CORS

from flask import Flask
from api.thinkgpt import thinkgpt_bp
from api.chat import chat_bp

app = Flask(__name__)
cors = CORS(app)
app.register_blueprint(chat_bp, url_prefix = "/chat")
app.register_blueprint(thinkgpt_bp, url_prefix = "/thinkgpt")
