const TelegramBot = require('node-telegram-bot-api');
const { addUser, getUserById } = require('../db/models/userModel');
const { addSubscription } = require('../db/models/subscriptionModel');
const { addBotLog } = require('../db/models/botLogModel');
const { botToken } = require('../config/index')
const { getUserSubscriptionStatus } = require('./botService')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(botToken, { polling: true });

// Command listener for "/start"
bot.on('message', async (msg) => {
    if(msg != '/subscribe'){
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    let user = await getUserById(chatId);
    if (!user) {
        user = await addUser({
            userId: chatId,
            username: username,
            creationDate: new Date(),
            emailRender: '', 
            passwordRender: '',
            apiKeys: ''
        });
        bot.sendMessage(chatId, "You need a valid key. press /subscribe");
    } else {
        const res = await getUserSubscriptionStatus(user.userId)
        if(res.success){
            if(res.active){
                bot.sendMessage(chatId, `Details: ${res.details}\nPress /dashboard`);
            } else {
                bot.sendMessage(chatId, "You need a valid key. press /subscribe");
            }
        } else {
            await addBotLog(chatId, '[ERROR 101]', `Username: ${username}`);
        }
        
    }
    
    await addBotLog(chatId, 'User started the bot', `Username: ${username}`);
}
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
