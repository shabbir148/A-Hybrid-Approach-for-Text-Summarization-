pip install plyfile
from TextSummarizer import TextSummarizer
from Summarizers.file_reader import Reader
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import json
from flask_cors import CORS, cross_origin



app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/fuzzy-rank", methods=["GET", "POST"])
def post():
    txt = request.json["text"].encode("utf8")
    article = txt
    udata = article.decode("utf-8")
    article = udata.encode("ascii", "ignore")
    ts = TextSummarizer(article)
    s = ts.summarize()
    print(s)
    return jsonify({"data":s})


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port='5002')
