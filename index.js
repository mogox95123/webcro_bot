const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const user = require('./user');
const keys = require('./keys');

const token = '6326528266:AAE42YJUpp7UCqJhb9KMVUtnIw_uuWGpZX4';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/name (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userInput = match[1]; // The captured input

    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        if (userInput) {
                            // Handle the user input
                            user.updateDomainUser(msg.chat.id, userInput, (error, results) => {
                                if(error){
                                    bot.sendMessage(msg.chat.id, "Sorry, there was an error adding your domain name.\nContact: @webcro_help");
                                    console.log(error)  
                                } else {
                                    bot.sendMessage(chatId, `Your domain name: ${userInput}\n\nWe will send you the information you need to setup the DNS record. If you don't have any response, send a message to: @webcro_help\n\nYou can now return to the dashboard !\n\nReturn to /dashboard`);
                                }
                            })
                            
                        }
                    }
                }));
                
                
            }
        } 
    });
});

bot.onText(/\/default/, (msg) => {
    const chatId = msg.chat.id;

    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(chatId, `You will see the default domain name in your dashboard, give a couple of minute before it show, you can now return to the dashboard.\n\nReturn to /dashboard`);
                    }
                }));
                
                
            }
        } 
    });
});

bot.onText(/\/api (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userInput = match[1]; // The captured input

    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        if (userInput) {
                            user.updateAPIUser(msg.chat.id, userInput, (error, results) =>{
                                if(error){
                                    bot.sendMessage(msg.chat.id, "Sorry, there was an error adding your api key.\nContact: @webcro_help");
                                    console.log(error)
                                } else {
                                    bot.sendMessage(chatId, `Your API KEY: ${userInput}\n\nNow I need your domain name:\n\n '/name REPLACE THIS BY YOUR DOMAIN NAME'\n\nOr use the default one, click /default\n\nReturn to /dashboard`);
                                }
                            })
                        }
                    }
                }));
                
                
            }
        } 
    });
});



bot.onText(/\/Next/, (msg) => {
    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        let message = `Enter the API Key of your telegram bot like this:\n\n'/api REPLACE THIS BY YOUR API KEY'\n\nSend me this form of message so I can save your API KEY.\n\nReturn to /dashboard`;
                        
                        bot.sendMessage(msg.chat.id, message);
                    }
                }));
                
                
            }
        } 
    });
});

bot.onText(/\/create/, (msg) => {
    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        let message = `We need 2 thing from you.\n\n`+
                                        `1. API Key of a telegram bot, where you will receive your result, that you will create using @BotFather\n`+
                                        `2. Your domain name for the page or use the default one that we will give you\n\n`+
                                        `When you got everything, click here /Next\n\nReturn to /dashboard`;
                        bot.sendMessage(msg.chat.id, message);
                    }
                }));
                
                
            }
        } 
    });
});

bot.onText(/\/dashboard/, (msg) => {
    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        let subscriptionEndDate = results[0].subscription_end_date;
                        let formattedEndDate = subscriptionEndDate ? new Date(subscriptionEndDate).toLocaleDateString("en-US", {
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit'
                          })  : 'No active subscription ';
                        let domainMessage = results[0].domain ? `Your domain name: ${results[0].domain}\n` : 'Your domain name: no domain\n';
                        let pageStatus = results[0].domain ? `Active page: 1\n\n` : `Active page: 0\n\n`
                        let message = `Username: ${msg.chat.username}\n`+
                        `Your User ID: ${msg.chat.id}\n`+
                        `${domainMessage}`+
                        `Your subscription end date: ${formattedEndDate}\n\n`+
                        `${pageStatus}`+
                        `Create a page: /create\n`+
                        `Delete a page: /delete\n`+
                        `Update a domain name for a page: /domain\n\n`+
                        `If you need help, send your User ID and your request thank you !\n@webcro_help`;
                        bot.sendMessage(msg.chat.id, message);
                    }
                }));
                
                
            }
        }
       
    })
    
});

bot.on('message', (msg) => {
    //console.log(msg);

    let day = ''
    const chatId = msg.chat.id;
    const receivedText = msg.text;

    user.checkingSubscriptionStatus(chatId, (error, results) => {
        if (error) {
            bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
            console.log(error)
        } else {
            if (results.length == 0) {
                keys.getKey(receivedText, (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        if (results.length > 0 && results[0].status != 'activated') {
                            keys.updateKeyStatus(receivedText, 'activated', (error, results) => {
                                if (error) {
                                    console.log(error)
                                }
                            })
                            bot.sendMessage(chatId, `Thank you ${msg.chat.username} !\nYour ${results[0].key_type} day subscription is now available.`);
                            day = results[0].key_type
                            user.getUser(chatId, (error, results) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    if (results.length > 0) {
                                        user.updateUserSubscription(chatId, day, (error, results) => {
                                            if (error) {
                                                console.log(error)
                                            }
                                        })
                                    } else {
                                        user.createUser(chatId, null, null, null,(error, results) => {
                                            if (error) {
                                                console.log(error)
                                            } else {
                                                user.updateUserSubscription(chatId, day, (error, results) => {
                                                    if (error) {
                                                        console.log(error)
                                                    }
                                                })
                                            }
                                        })
                                    }

                                }
                            })
                            bot.sendMessage(chatId, `Use /dashboard to continue.`);
                        } else {
                            bot.sendMessage(chatId, `I need a valid key to start.\nGet one free for 7 day with @webcro_help`);
                        }
                    }
                })

            }

        }
    })

    //bot.sendMessage(chatId, `I need a valid key to start.\nGet one free for 7 day with @webcro_help`);
});