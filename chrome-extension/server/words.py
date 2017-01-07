import sys
import pymongo
import json
import codecs


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
    	val['amount'] = doc['amount'];
    	data.append(val)
    data = json.dumps(data)
    
    client.close()

    return data




def convertToCSV(parsed_words):
	
	wrd_data = parsed_words['words']

	# open a file for writing

	word_data = open('WordsData.csv', 'w')

	# create the csv writer object

	csvwriter = csv.writer(word_data)

	count = 0

	for wrd in wrd_data:

	      if count == 0:

	             header = wrd.keys()

	             csvwriter.writerow(header)

	             count += 1

	      csvwriter.writerow(wrd.values())

	word_data.close()

  

def updateWordAmount(_word,amount):

    
    client = pymongo.MongoClient(MONGODB_URI)

    db = client.get_default_database()
    
    songs = db['words']

    newAmount = songs.find_one({"word": _word})['amount']+ int(amount)
    query = {"word":_word}
    songs.update_one(query, {'$set': {'amount': newAmount}})

    client.close()

  



  
