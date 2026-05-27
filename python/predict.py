import random
import sys
import json
import pickle
import os

# current folder path
BASE_DIR = os.path.dirname(__file__)

# load intents
intent_path = os.path.join(BASE_DIR, "intents.json")

with open(intent_path, "r") as file:
    data = json.load(file)

# load vectorizer
vector_path = os.path.join(BASE_DIR, "vectorize.pkl")
vectorize = pickle.load(open(vector_path, "rb"))

# load model
model_path = os.path.join(BASE_DIR, "model.pkl")
model = pickle.load(open(model_path, "rb"))

# chatbot response
def chatbot_response(text):

    x = vectorize.transform([text])

    tag = model.predict(x)[0]

    for intent in data["intents"]:

        if intent["tag"] == tag:

            return random.choice(intent["responses"])

# get message from nodejs
message = sys.argv[1]

# response
response = chatbot_response(message)

print(response)