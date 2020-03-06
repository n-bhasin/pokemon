/*
FINISHED EXAMPLE
*/


const express = require('express');
const mongoIO = require('./io');

// ** ToDO: place your mongo Atlas url in the url module ** 

var bodyParser = require('body-parser') 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));  // <-- serve static files
app.use(bodyParser.urlencoded({ extended: false }));  // <-- make request body data available
app.use(bodyParser.json())

function GetCassettesApi (req, res, next) {
    function resultsCallback (err, docs) {
        if (docs) {
            res.json({'pokedex': docs})
        } else {
            console.log('ouch');
            console.log(err);
        }
    }
    mongoIO.readItems(resultsCallback);
}

app.get('/api/pokemon', GetCassettesApi)

function PostCassettesApi (req, res, next) {
    if (req.body.add_cassette) {
        try {
            console.log(req.boddy);
            mongoIO.writeItem(req.body)
        } catch (e) {
            next(`Ouch! ${e}`);
        }
        res.redirect('/index.html')
    }
}

app.post('/api/pokemon', PostCassettesApi)
app.get('/', function(req, res) {
    res.redirect('/index.html')
})


function DeleteCassetteApi(req, res, next) { // Even your error handling has to be checked! Originally forgot to include next
    try {
        var title = req.body.title;
        console.log(`Trying to delete: ${title}`);
        mongoIO.deleteItem({title: req.body.title});
        req.body.status = 'deleted';
        console.log(`Deleted ${title}`);
        res.send(req.body);  // We send this back, because the event will be out of context in the browser
    } catch (e) {
        next(`Ouch! ${e}`);
    }
    
}

app.delete('/api/cassettes', DeleteCassetteApi)

app.listen(port, function() {console.log(`Example app listening on port ${port}!`)})
