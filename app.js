require('dotenv').config();

const TOKEN = process.env.bot || 'YOUR_TELEGRAM_BOT_TOKEN';
const url = process.env.domain;
const port = process.env.port || 5000;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

const botUsers = new Map();

bot.onText(/\/start/, (msg) => {
    botUsers.set('user', msg.chat.id);
    bot.sendMessage(msg.chat.id, "Welcome");
});

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
    bot.sendMessage(botUsers.get('user'), 'Hello');
    res.sendStatus(200);
});


// Just to ping!
bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'I am alive!');
});





app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/src/views/index.html')
})

app.listen(port, () => {
    bot.launch();
    console.log(`Express server is listening on ${port}`);
});

