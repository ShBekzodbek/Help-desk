const { Telegraf, Markup } = require('telegraf');



require('dotenv').config();



const bot = new Telegraf('6212965476:AAEcdh4ZBnCoqWx2v6YYIvRMcMj7Fry7rAU');



const web_link = 'https://help-desk-cs11.onrender.com/home';

bot.start((ctx) =>
    ctx.reply("Welcome :)))))", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
            resize_keyboard: true
        },
    })
);


bot.on('onWebAppOpened', async (ctx) => {
    const data = ctx.data;
    const handle = ctx.handle;

    console.log(data, handle);

    // Do something with the data and handle here.
});




bot.launch();