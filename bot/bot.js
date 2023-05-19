const { Telegraf, Markup } = require('telegraf');

require('dotenv').config();

const bot = new Telegraf(process.env.bot);


bot.command("register", (ctx) => {
    return ctx.reply(
        "open webapp",
        Markup.keyboard([
            Markup.button.webApp(
                "Open",
                process.env.domain
            ),
        ])
    );
});


bot.launch(
    {
        webhook: {
            domain: process.env.domain,
            port: process.env.port,
        }
    }
);