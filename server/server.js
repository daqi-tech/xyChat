const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1/xyChat';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongoDB connect success');
});
const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello xyChat</h1>')
})
app.get('/data', function (req, res) {
    res.send('123456789456')
})
app.listen(9093, function () {
    console.log('Node app start at port 9093')
})