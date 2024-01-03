const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you received from BotFather
const token = '6326528266:AAE42YJUpp7UCqJhb9KMVUtnIw_uuWGpZX4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message
bot.on('message', (msg) => {
    // The 'msg' is the received Message from Telegram
    console.log(msg);
  
    // Extract the text from the message
    const chatId = msg.chat.id;
    const receivedText = msg.text;
  
    // Reply to the same chat with a confirmation message
    bot.sendMessage(chatId, `I need a key to start.\nGet one free for 7 day with @webcro_help`);
  });