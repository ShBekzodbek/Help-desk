/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */


require('dotenv').config();

const TOKEN = process.env.bot || 'YOUR_TELEGRAM_BOT_TOKEN';
const url = process.env.domain;
const port = process.env.port || 5000;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');



// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'I am alive!');
});






app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/src/views/index.html')
})
