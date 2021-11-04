const { Telegraf } = require('telegraf');

import { _handleCommand, _handleTaste } from './internal';

const bot = new Telegraf(env.API_TOKEN);

/* 
    Handling selected taste
*/
bot.action(/.*-taste/, (ctx) => _handleTaste(ctx));
/*
    Handling all the commands from inline buttons actions 
    and from input directly
*/
bot.action(/\/[a-zA-Z]+/, (ctx) => _handleCommand(ctx));
bot.hears(/\/[a-zA-Z]+/, (ctx) => _handleCommand(ctx));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))