const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb+srv://jdy8739:AzC0ynC4Kkl30Imt@cluster0.kz1h4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;

MongoClient.connect(URL, function(error, client){
    if(error) return console.log(error);
    app.listen('8080', function() {
        db = client.db('todoapp');
        console.log('listening on 8080');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/pet', (req, res) => {
    res.send('pet page');
});

app.get('/beauty', (req, res) => {
    res.send('beauty page');
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body);

    const newTodo = { title: req.body.title, content: req.body.content, date: Date.now() };
    db.collection('post').insertOne(newTodo, function() {
        console.log('new todo saved.');
    });

    res.send('complete.');
});


app.get('/list', (req, res) => {
    db.collection('post').find().toArray(function(err, data) {
        console.log(data);
        res.render('list.ejs', { data });
    });
});