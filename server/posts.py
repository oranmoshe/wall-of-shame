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
from bson import Binary, Code
from bson.json_util import dumps
from bson.json_util import dumps



MONGODB_URI = 'mongodb://oran:1234@ds139715.mlab.com:39715/nashim'


def getPostsByUser(username):
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['posts']

    cursor = songs.find({"username": username}).sort([("_id",pymongo.DESCENDING)]).limit(1)
    # data = []
    # for doc in cursor:
    #     val = {}
    #     if(doc ='username'):
    #         val['username'] = doc
    #     if(doc ='userimg'):
    #         val['userimg'] = doc
    #     if(doc ='posturl'):
    #         val['posturl'] = doc
    #     if(doc ='userContent'):
    #         val['userContent'] = json.dumps(doc)
    #     if(doc ='comments'):
    #         val['comments'] = json.dumps(doc)
    #     comments = []
    #     for doc2 in doc['comments']:
    #         val2 = {}
    #         val2['comment_pic'] = doc2['comment_pic'];
    #         val2['comment_content'] = doc2['comment_content'];
    #         val2['offensive'] = doc2['offensive'];
    #         val2['comment_name'] = doc2['comment_name'];
    #         comments.append(val2)
    #     val['comments'] = comments
    #     data.append(val)
    #data = data.decode('unicode-escape').encode('utf8')

    client.close()

    return dumps(cursor);

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

def getPostUsersImages():
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


    if(getCommentsLen(val['posturl']) == -1):
        print("new")
        songs.insert_one(val)
    else:
        isPostNewer = (getCommentsLen(val['posturl']) < len(val["comments"]))
        print("exist, newer: " + str(isPostNewer))
        if(isPostNewer):
            query = {"posturl":val['posturl']}
            songs.update_one(query, {'$set': {'comments': val['comments']}})
    client.close()

    return post

def getCommentsLen(_posturl):
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()

    songs = db['posts']
    post = songs.find_one({"posturl": _posturl})
    if(post):
        client.close()
        return len(post["comments"])
    return -1
