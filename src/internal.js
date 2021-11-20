import { Markup } from 'telegraf';
import { COMMANDS, BASES, TOBACCOS_NAMES, TOBACCO_PHOTO_URLS } from './constants';
import { _getTobaccos } from './database';

const _createKeyboard = (keyboard) => {
    return Object.keys(keyboard).map(key => {
        return Markup.button.callback(keyboard[key], key);
    });
}

const _showTobaccosList = (tobaccos, ctx) => {
  if (! (tobaccos && tobaccos.length)) {
    return ctx.reply('For now I do not know any tobaccos with such a taste...');
  }
  let list = `
    <b>
      ${tobaccos.reduce((prevList, currentTobacco) => {
        //TODO: use some emojy instead of bullet
        return prevList + `\n• <u>${TOBACCOS_NAMES[currentTobacco.name]}</u>`
      }, '')}
    </b>
  `;
  return ctx
    .replyWithHTML(`Here are the toboccos that I can suggest: ${list}`)
    .then(() => _showTobaccosImages(tobaccos, ctx));
};

const _showTobaccosImages = (tobaccos, ctx) => {
  const promises = [];
  tobaccos.forEach(tobacco => {
    promises.push(
      ctx.replyWithPhoto(
        { 
          /*
            For now I can't use local pathes for photos, since I'm not using Local Telegram Bot.
          */ 
          url: TOBACCO_PHOTO_URLS[tobacco.name]
        }, 
        { 
          caption: TOBACCOS_NAMES[tobacco.name]
        }
      )
    );
  });
  return Promise.all(promises);
};

export const _handleTaste = (ctx) => {
    const fullMatch = ctx.match[0];
    const tasteName = ctx.match[0].split('-')[0];

    return ctx.answerCbQuery(
        `Oh, ${BASES[fullMatch].toLowerCase()}! Let me see what I have...`
    ).then(() => {
      _getTobaccos(tasteName).then((tobaccos) => _showTobaccosList(tobaccos, ctx));
    });
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