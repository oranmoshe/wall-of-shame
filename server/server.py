from flask import Flask, url_for, json,Response,render_template,send_from_directory, request,send_from_directory,send_file
from flask_cors import CORS, cross_origin
import requests,os
import words
import posts
import csvcon

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getAllWords/', methods = ['GET'])
@cross_origin()
def getAllWords():
    return words.getAllWords()


@app.route('/success/<name>')
@cross_origin()
def success(name):
   return 'welcome %s' % name

@app.route('/getPlotCSV')
@cross_origin()
def plot_csv():
    csvcon.convertToCSV()
    return send_file(os.path.dirname(os.path.abspath(__file__))+'/static/data/WordsData.csv',
                     mimetype='text/csv',
                     attachment_filename='WordsData.csv',
                     as_attachment=False)

@app.route('/updateamount',methods = ['POST', 'GET'])
@cross_origin()
def updateamount():
   if request.method == 'POST':
      word = request.form['word']
      amount = request.form['amount']
      words.updateWordAmount(word,amount)
      resp = Response(json.dumps({}), status=200, mimetype='application/json')
      resp.headers['Link'] = 'http://abc'
      return resp

@app.route('/addPost',methods = ['POST', 'GET'])
@cross_origin()
def addPost():
    if request.method == 'POST':
      post = request.get_json(force=True)
      json_data = posts.addPost(json.dumps(post))
      resp = Response(json.dumps(json_data), status=200, mimetype='application/json')
      resp.headers['Link'] = 'http://abc'
      return resp

@app.route('/getAllPosts',methods = ['POST', 'GET'])
@cross_origin()
def getAllPosts():
    json_data = posts.getAllPosts()
    resp = Response(json.dumps(json_data), status=200, mimetype='application/json')
    resp.headers['Link'] = 'http://abc'
    return resp

@app.route('/getRandomOffensiveUser',methods = ['POST', 'GET'])
@cross_origin()
def getRandomOffensiveUserImage():
    json_data = posts.getRandomOffensiveUserImage()
    resp = Response(json_data, status=200, mimetype='application/json')
    resp.headers['Link'] = 'http://abc'
    return resp

@app.route('/getPostsByUser/<username>',methods = ['POST', 'GET'])
@cross_origin()
def getPostsByUser(username):
    json_data = posts.getPostsByUser(username)
    resp = Response(json_data, status=200, mimetype='application/json')
    resp.headers['Link'] = 'http://abc'
    return resp


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug = True)
