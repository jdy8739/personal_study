const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log('listening on 8080.');
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
    res.send('complete.');
});