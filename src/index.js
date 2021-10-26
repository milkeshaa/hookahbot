const { Telegraf } = require('telegraf');

const bot = new Telegraf(env.API_TOKEN);

bot.start((ctx) => {
    ctx.reply('I love you, Nastya! <3');
});

bot.launch();