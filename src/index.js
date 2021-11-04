const { Telegraf, Markup } = require('telegraf');

import { BASES } from './constants';

const bot = new Telegraf(env.API_TOKEN);

bot.start((ctx) => { 
    const keyboard = Object.keys(BASES).map(key => {
        return Markup.button.callback(BASES[key], key);
    });
    return ctx.reply(
        'Choose your preferable taste base',
        Markup.inlineKeyboard(keyboard)
    );
});

bot.action(/.*-taste/, (ctx) => {
    return ctx.answerCbQuery(
        `Oh, ${BASES[ctx.match[0]].toLowerCase()}! Great choice`
    );
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))