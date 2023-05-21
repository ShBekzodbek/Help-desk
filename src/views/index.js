require('dotenv').config();

const express = require('express');

const axios = require('axios');

const app = express();


const { bot, domain } = process.env;

const TG_API = `https://api.telegram.org/bot${bot}`;

const URI = `/webhook/${bot}`;

const webhook_url = domain + URI;

app.use(express.json());

const init = async () => {
    const res = await axios.get(`${TG_API}/setWebhook?url=${webhook_url}`);
    console.log(res.data);
}

app.listen(process.env.port || 5000, () => {
    console.log('server is running');
})
