import sys
import pymongo
import json
import codecs
import csv
import requests,os
import importlib
import sys  

MONGODB_URI = 'mongodb://oran:1234@ds139715.mlab.com:39715/nashim'

def getAllWords():

    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['words']

    cursor = songs.find()
    data = []
    for doc in cursor:
    	val = {}
    	val['word'] = doc['word'];
    	val['gender'] = doc['gender'];
    	val['definition'] = doc['definition'];
    	val['total_amount'] = doc['total_amount'];
    	data.append(val)
    data = json.dumps(data).decode('unicode-escape').encode('utf8')

    client.close()

    return data


def updateWordAmount(_word,amount):

    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['words']

    newAmount = songs.find_one({"word": _word})['total_amount']+ int(amount)
    query = {"word":_word}
    songs.update_one(query, {'$set': {'total_amount': newAmount}})

    client.close()







