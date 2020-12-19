from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
from pymongo import MongoClient
from waitress import serve
from pinterest import getPinterestInfo
from youtube import get_youtube
from location import getLocInfo
import os
import json
from bson.json_util import dumps


client = MongoClient("mongodb+srv://anubhav:hackathon@cluster0.o1kse.mongodb.net/vibrance_db?retryWrites=true&w=majority")
db = client.get_database('vibrance_db')

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/', methods=['GET'])
def index():  
    return("Hello world")

@app.route('/userSignUp', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def userSignUp():


    records = db.userdetails

    userDetails = request.get_json()
    email = userDetails['Email']

    response = dumps(records.find_one({'Email': email}))

    if (response):
        return ("False")
    else:
        response = records.insert_one(userDetails)
        print(response)
        return (response)


@app.route('/userSignIn', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def userSignIn():

    records = db.userdetails

    userDetails = request.get_json()
    email = userDetails['Email']
    pasd = userDetails['Password']

    response = dumps(records.find_one({'Email': email, 'Password':pasd}))
    print(response)

    if (response):
        return response
    else:
        return ("False")



@app.route('/challenge_submission', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def challenge_submission():

    records = db.challenge_submission

    submission_details = request.get_json()
    response = records.insert_one(submission_details)
    print(response)

    if (response):
        return "True"
    else:
        return "False"


@app.route("/pinterest/<string:query>")
@cross_origin(support_credentials=True)
def pinterest(query):
    list = getPinterestInfo(query)
    return jsonify(results = list)

@app.route("/youtube/<string:query>")
@cross_origin(support_credentials=True)
def youtube(query):
    list = get_youtube(query)
    return jsonify(results = list)
    
@app.route("/location/<string:query>")
@cross_origin(support_credentials=True)
def location(query):
    list = get_youtube(query)
    return jsonify(results = list)


@app.route('/insertChallenges', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def insertChallenges():

    records = db.challenges

    f = open('challenges.json')
    data = json.load(f)


    response = records.insert_many(data)
    print(response)
    return ("True")


@app.route('/fetchChallenges', methods=['GET','POST'])
@cross_origin(support_credentials=True)
def fetchChallenges():

    records = db.challenges
    response = dumps(records.find())
    return (response)


@app.route('/fetchUserName', methods=['GET','POST'])
@cross_origin(support_credentials=True)
def fetchUserName():


    records = db.userdetails

    header_data = request.get_json()
    user = header_data['user_key']
    response = dumps(records.find_one({'_id':  ObjectId(user)}))
    print(response)

    # records = db.userdetails
    # response = dumps(records.find())
    return response


@app.route('/adminAddChallenge', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def adminAddChallenge():

    records = db.challenges
    admin_challenges = request.get_json()
    response = records.insert_one(admin_challenges)
    print(response)
    return ("True")


@app.route('/userChallengesEnrolled', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def userChallengesEnrolled():

    records = db.challenges_enrolled

    challenges_enrolled = request.get_json()
    user = challenges_enrolled['user_key']
    challenge = challenges_enrolled['challenge_key']

    response = records.find_one({'user_key': user, 'challenge_key': challenge})

    if (response):
        return ("False")
    else:
        response = records.insert_one(challenges_enrolled)
        print(response)
        return ("True")



@app.route('/checkUserChallengesEnrolled', methods=['GET', 'POST'])
@cross_origin(support_credentials=True)
def checkUserChallengesEnrolled():


    records = db.challenges_enrolled

    user_challenge = request.get_json()
    user = user_challenge['user_key']
    challenge = user_challenge['challenge_key']

    response = records.find_one({'user_key': user, 'challenge_key': challenge})
    print(response)
    if (response):
        return ("True")
    else:
        return ("False")



# app.run(port=5000, debug=True)
if __name__ == '__main__':
    app.run()