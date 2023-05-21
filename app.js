require('dotenv').config();

const { createServer } = require('http');

const TOKEN = process.env.bot || 'YOUR_TELEGRAM_BOT_TOKEN';
const url = process.env.domain;
const port = process.env.port || 5000;

const { Telegraf } = require('telegraf');
const express = require('express');


// No need to pass any parameters as we will handle the updates with Express
const bot = new Telegraf(TOKEN);

const botUsers = new Map();


const app = express();

// parse the updates to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');



// We are receiving updates at the route below!
app.post(`/bot_${TOKEN}`, (req, res) => {
    console.log(req.body);
});

app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/src/views/index.html')
})

const server = createServer(app);

bot.launch({
    webhook: url,
    port: 4000
})

server.listen(process.env.port || 4000);

