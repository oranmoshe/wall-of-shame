import sys
import pymongo
import json
import codecs
import csv
import requests,os
import importlib
import sys

import collections  # From Python standard library.
import bson
from bson.codec_options import CodecOptions

MONGODB_URI = 'mongodb://oran:1234@ds139715.mlab.com:39715/nashim'


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


def addPost(post):

    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['posts']

    post = json.loads(post)
    val = {}
    for doc in post:
        val['username'] = post["username"]
        val['userimg'] = post["userimg"]
        val['posturl'] = post["posturl"]
        val['userContent'] = post["userContent"]

        comments = []
        for doc2 in  post['comments']:
            val2 = {}
            val2['offensive'] = doc2['offensive']
            val2['comment_name'] = doc2['comment_name']
            val2['comment_pic'] = doc2['comment_pic']
            val2['comment_content'] = doc2['comment_content']
            comments.append(val2)
        val['comments'] = comments

    songs.insert_one(val)

    client.close()

    return post





