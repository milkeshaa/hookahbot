import { Markup } from 'telegraf';
import { COMMANDS, BASES } from './constants';

const _createKeyboard = (keyboard) => {
    return Object.keys(keyboard).map(key => {
        return Markup.button.callback(keyboard[key], key);
    });
}

export const _handleTaste = (ctx) => {
    return ctx.answerCbQuery(
        `Oh, ${BASES[ctx.match[0]].toLowerCase()}! Great choice`
    );
};

export const _handleCommand = (ctx) => {
    const command = ctx.match[0];
    if (! COMMANDS[command]) {
        return ctx.reply('Unsupported command... Try /help one');
    }

    switch (command) {
        case '/start': {
            const keyboard = _createKeyboard(BASES);
            return ctx.reply(
                'Choose your preferable taste base',
                Markup.inlineKeyboard(keyboard)
            );
        }
        case '/help': {
            const keyboard = _createKeyboard(COMMANDS);
            return ctx.reply(
                'Available commands',
                Markup.inlineKeyboard(keyboard, {columns: 1})
            );
        }
    } 
};