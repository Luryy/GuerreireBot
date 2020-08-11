const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const opt = {polling: true};
const bot = new TelegramBot(token, opt);

module.exports = bot;
