import sys
import pymongo
import json
import codecs
import csv
import requests,os

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

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

def getAllPosts():
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['posts']

    cursor = songs.find()
    data = []
    for doc in cursor:
        val = {}
        val['username'] = doc['username'];
        val['posturl'] = doc['posturl'];
        val['userimg'] = doc['userimg'];
        val['userContent'] = json.dumps(doc['userContent']);
        comments = []
        for doc2 in doc['comments']:
            val2 = {}
            val2['comment_pic'] = doc2['comment_pic'];
            val2['comment_content'] = doc2['comment_content'];
            val2['offensive'] = doc2['offensive'];
            val2['comment_name'] = doc2['comment_name'];
            comments.append(val2)
        val['comments'] = comments
        data.append(val)
    #data = data.decode('unicode-escape').encode('utf8')

    client.close()

    return data


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







def addPost(post):
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['posts']
    many = {}
    many["name"] = "dd"
    songs.insert_one(json.dumps("oran"))

    client.close()






