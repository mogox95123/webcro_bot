const TelegramBot = require('node-telegram-bot-api');
const { addUser, getUserById } = require('../db/models/userModel');
const { addSubscription } = require('../db/models/subscriptionModel');
const { addBotLog } = require('../db/models/botLogModel');
const { botToken } = require('../config/index') // Ensure you have set your bot token in your environment variables

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(botToken, { polling: true });

// Command listener for "/start"
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    // Try to retrieve the user from the database
    let user = await getUserById(chatId);
    if (!user) {
        // If user does not exist, add them to the database
        user = await addUser({
            userId: chatId,
            username: username,
            creationDate: new Date(),
            emailRender: '', // Assume these fields will be set later
            passwordRender: '',
            apiKeys: ''
        });
        bot.sendMessage(chatId, "Welcome! You've been registered.");
    } else {
        bot.sendMessage(chatId, "Welcome back!");
    }
    // Log the action
    await addBotLog(chatId, 'User started the bot', `Username: ${username}`);
});

// Command listener for "/subscribe"
bot.onText(/\/subscribe/, (msg) => {
    const chatId = msg.chat.id;
    // This is a placeholder for subscription logic
    // You could interact with your subscriptionModel here
    bot.sendMessage(chatId, "Subscription functionality is not implemented yet.");
    // Log the action
    addBotLog(chatId, 'Subscribe attempt', 'User attempted to subscribe.');
});

// You can add more command listeners and logic for other bot functionalities

module.exports = bot;
