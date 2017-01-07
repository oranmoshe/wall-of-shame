import json
import csv

words_data = '{"words":[{"word": "zona", "counter": 6, "offsets": [{"title": "sports", "url": "http://www.json-generator.com/", "archPath": "arch/abc.txt", "time": "1 Jan 2014", "counter": 4}]},{"word": "tipsha", "counter": 6, "offsets": [{"title": "economics", "url": "http://www.json-generator.com/", "archPath": "arch/abc.txt", "time": "1 Jan 2014", "counter": 4}]}]}'

parsed_words = json.loads(words_data)

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
