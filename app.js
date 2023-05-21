require('dotenv').config();

const { createServer } = require('http');

const TOKEN = process.env.bot || 'YOUR_TELEGRAM_BOT_TOKEN';
const url = process.env.domain;
const port = process.env.port || 5000;

const { Telegraf } = require('telegraf');
const express = require('express');



const app = express();


// parse the updates to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');




// We are receiving updates at the route below!
app.post(`/bot_${TOKEN}`, (req, res) => {
    console.log(req.body);
    return res.status(200);
});

app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/src/views/index.html')
})

const server = createServer(app);


server.listen(process.env.port || 4000);

