from flask import Flask, url_for, json,Response,render_template,send_from_directory, request
from flask_cors import CORS, cross_origin
import requests,os
import words

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getAllWords/', methods = ['GET'])
@cross_origin()
def getAllWords():
    return words.getAllWords()


@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name


@app.route('/updateamount',methods = ['POST', 'GET'])
def updateamount():
   if request.method == 'POST':
      word = request.form['word']
      amount = request.form['amount']
      words.updateWordAmount(word,amount)
      return word


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug = True)