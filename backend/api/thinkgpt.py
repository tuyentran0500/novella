
from flask import Blueprint
from thinkgpt.llm import ThinkGPT
import os

thinkgpt_bp = Blueprint('thinkgpt', __name__)

@thinkgpt_bp.route('', methods=['GET'])
def thinkgptBasic():
    llm = ThinkGPT(model_name="gpt-3.5-turbo")

    rules = llm.abstract(observations=[
        "in tunisian, I did not eat is \"ma khditech\"",
        "I did not work is \"ma khdemtech\"",
        "I did not go is \"ma mchitech\"",
    ])
    llm.memorize(rules)

    llm.memorize("in tunisian, I studied is \"9rit\"")

    task = "translate to Tunisian: I didn't study"
    result = llm.predict(task, remember=llm.remember(task))
    print(result)

    return {"content": result}, 200