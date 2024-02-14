const TelegramBot = require('node-telegram-bot-api');
const { addUser, getUserById } = require('../db/models/userModel');
const { addSubscription } = require('../db/models/subscriptionModel');
const { addBotLog } = require('../db/models/botLogModel');
const { botToken } = require('../config/index')
const { getUserSubscriptionStatus, dashboard, handleNewSubscription, createPage, setUserInfoForCreatingPage } = require('./botService')

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(botToken, { polling: true });



// Command listener for "/start"
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    

    if (msg.text != '/subscribe' && msg.text != '/dashboard' && msg.text != '/create') {
        let user = await getUserById(chatId);
        if (!user) {
            user = await addUser({
                userId: chatId,
                username: username,
                creationDate: new Date(),
                emailRender: '',
                passwordRender: '',
                domain: '',
                apiKeys: '',
                vpsip: '',
                vpspassword: ''
            });
            bot.sendMessage(chatId, "You need a valid key. press /subscribe");
        } else {
            if (msg.text.length === 29) {
                const resHandler = await handleNewSubscription(chatId, msg.text);
                if (resHandler.success) {
                    bot.sendMessage(chatId, resHandler.message);
                } else {
                    console.log(resHandler.message);
                    await addBotLog(chatId, '[ERROR 103]', `Username: ${username}`);
                }
            }
           
            const res = await getUserSubscriptionStatus(chatId)
            if (res.success) {
                if (res.active) {
                    bot.sendMessage(chatId, `Press /dashboard`);
                    const resSet = await setUserInfoForCreatingPage(msg, chatId);
                    if(resSet){
                        
                        if(resSet.success){
                           
                            await addBotLog(chatId, 'INFO', `Username: ${username} || Secret: ${resSet.info.RECAPTCHA_SECRET_KEY} || Site: ${resSet.info.RECAPTCHA_SITE_KEY}`);
                            bot.sendMessage(chatId, resSet.message, { parse_mode: 'Markdown' });
                        } else {
                            await addBotLog(chatId, '[ERROR 105]', `Username: ${username}`);
                        }
                    }
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

bot.onText(/\/create/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const res = await getUserSubscriptionStatus(chatId)
    if (res.success) {
        if (res.active) {
            const res = await createPage();
            if (res.success) {
                bot.sendMessage(chatId, res.message, { parse_mode: 'Markdown' });
            } else {
                await addBotLog(chatId, '[ERROR 104]', `Username: ${username}`);
            }
        } else {
            bot.sendMessage(chatId, "You need a valid key. press /subscribe");
        }
    }
});

// Command listener for "/subscribe"
bot.onText(/\/dashboard/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const res = await getUserSubscriptionStatus(chatId)
    if (res.success) {
        if (res.active) {
            const res = await dashboard(chatId)
            if (res.success) {
                bot.sendMessage(chatId, res.message);
            } else {
                await addBotLog(chatId, '[ERROR 102]', `Username: ${username}`);
            }
        } else {
            bot.sendMessage(chatId, "You need a valid key. press /subscribe");
        }
    }

    addBotLog(chatId, 'Dashboard attempt', `Username: ${username}`);
});

// Command listener for "/subscribe"
bot.onText(/\/subscribe/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const res = await getUserSubscriptionStatus(chatId)
    if (res.success) {
        if (res.active) {
            bot.sendMessage(chatId, `Press /dashboard`);
        } else {
            const opts = {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '1 day', url: 'https://webcro.mysellix.io/pay/b8d6e8-248c8875c4-591ad9' },
                            { text: '7 days', url: 'https://webcro.mysellix.io/pay/abc7aa-365135fc2f-ed5e2e' },
                            { text: '31 days', url: 'https://webcro.mysellix.io/pay/da7f57-4c51d65515-9e0516' }
                        ]
                    ]
                }
            };

            bot.sendMessage(chatId, 'Choose a subscription:', opts);

            addBotLog(chatId, 'Subscribe attempt', `Username: ${username}`);
        }
    }
});

// You can add more command listeners and logic for other bot functionalities

module.exports = bot;
