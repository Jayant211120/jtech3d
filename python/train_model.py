#import some librar
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle
import json

#open the file
with open("intents.json") as file:
    data=json.load(file)

#create list
tags=[]
patterns=[]

#extract the data from intents.json
for intent in data['intents']:
    for pattern in intent['patterns']:
        patterns.append(pattern)
        tags.append(intent['tag'])

#text to numberic conversion through dictvectorization
vectorize = CountVectorizer()
x = vectorize.fit_transform(patterns)

#load data to model
model = MultinomialNB()
model.fit(x,tags)

#save the model
pickle.dump(vectorize,open("vectorize.pkl","wb"))
pickle.dump(model,open("model.pkl","wb"))
