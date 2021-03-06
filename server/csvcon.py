import sys
import pymongo
import json
import codecs
import csv
import requests,os
import importlib
reload(sys)
sys.setdefaultencoding('utf-8')

MONGODB_URI = 'mongodb://oran:1234@ds139715.mlab.com:39715/nashim'

def convertToCSV():
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['words']

    cursor = songs.find()

    word_data = open('static/data/WordsData.csv', 'w')

    # create the csv writer object

    csvwriter = csv.writer(word_data)

    count = 0
    order = {}
    for doc in cursor:
        if count == 0:

            header = doc.keys()
            newOrd = []
            order['word'] = (header.index("word"))
            order['id'] = (header.index("id"))
            order['definition'] = (header.index("definition"))
            order['total_amount'] = (header.index("total_amount"))
            order['group'] = (header.index("group"))
            order['gender'] = (header.index("gender"))
            newOrd.append(header[order['word']])
            newOrd.append(header[order['id']])
            newOrd.append(header[order['definition']])
            newOrd.append(header[order['total_amount']])
            newOrd.append(header[order['group']])
            newOrd.append(header[order['gender']])
            csvwriter.writerow(newOrd)

            count += 1

        value = doc.values()
        newOrd = []
        newOrd.append(value[order['word']])
        newOrd.append(value[order['id']])
        newOrd.append(value[order['definition']])
        newOrd.append(value[order['total_amount']])
        newOrd.append(value[order['group']])
        newOrd.append(value[order['gender']])
        csvwriter.writerow(newOrd)

    word_data.close()
    client.close()










