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

@app.route('/', methods = ['GET'])
@cross_origin()
def root():
    return "root"


@app.route('/updateamount/<string:_word>/<int:_amount>')
def update_word(_word,_amount):
    words.updateWordAmount(_word,_amount)
    return "yes"

@app.route('/login',methods = ['POST', 'GET'])
@cross_origin()
def login():
   if request.method == 'POST':
      wordd = request.form['word']
      amountt = request.form['amount']
      words.updateWordAmount(wordd,amountt)
      return "yes"

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug = True)