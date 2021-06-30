const summarizePage = require("./lexrank");
const express = require('express');
const cors = require('cors');
const app = express();
var http = require('http');
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var httpServer = http.createServer(app);
try {
    httpServer.listen(4900);
} catch (error) {
    console.log(error)
}

const summarizeText = async function (req, res) {
    let text = req.body.text


    let promise = new Promise((resolve, reject) => {
        summarizePage.summarize(text, 5, function ( lines, summa) {
            console.log( lines, summa)
            resolve({ lines, summa })
        })
    })

    let data = await promise

    return res.json(data)

}


router.post('/lexrank', summarizeText);


app.use(cors());
app.use('/', router);


module.exports = app;
