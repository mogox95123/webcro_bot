const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql');
const user = require('./user');
const keys = require('./keys');

const token = '6326528266:AAE42YJUpp7UCqJhb9KMVUtnIw_uuWGpZX4';

const bot = new TelegramBot(token, { polling: true });

const notificationId = -4071258998

bot.onText(/\/delete/, (msg) => {
    const chatId = msg.chat.id;

    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 801\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 802\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nWant to delete is page`);
                        bot.sendMessage(chatId, `The notification to DELETE the page as been sent to admin !\n\nReturn to /dashboard`);
                    }
                }));
                
                
            }
        } 
    });
});

bot.onText(/\/name (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userInput = match[1]; // The captured input

    user.checkingSubscriptionStatus(msg.chat.id, (error, results) => {
        if(error){
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 701\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 702\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        if (userInput) {
                            // Handle the user input
                            user.updateDomainUser(msg.chat.id, userInput, (error, results) => {
                                if(error){
                                    bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 703\n\nThe error: ${error}`);
                                    bot.sendMessage(msg.chat.id, "Sorry, there was an error adding your domain name.\nContact: @webcro_help");
                                    console.log(error)  
                                } else {
                                    bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nUpdate domain name with is own one`);
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
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 601\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 602\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nUse the default domain name`);
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
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 501\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 502\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        if (userInput) {
                            user.updateAPIUser(msg.chat.id, userInput, (error, results) =>{
                                if(error){
                                    bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 503\n\nThe error: ${error}`);
                                    bot.sendMessage(msg.chat.id, "Sorry, there was an error adding your api key.\nContact: @webcro_help");
                                    console.log(error)
                                } else {
                                    bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nUpdate is api key`);
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
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 401\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 402\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nClick on next`);
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
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 301\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 302\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nOn creating a page`);
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
            bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 201\n\nThe error: ${error}`);
            bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
            console.log(error)
        } else {
            if(results.length > 0){
                if(user.getUser(msg.chat.id, (error, results) => {
                    if(error){
                        bot.sendMessage(notificationId, `Error with ID: ${msg.chat.id}\n\nError 202\n\nThe error: ${error}`);
                        bot.sendMessage(msg.chat.id, "Sorry, there was an error retrieving your subscription information.\nContact: @webcro_help");
                        console.log(error)
                    } else {
                        bot.sendMessage(notificationId, `ID: ${msg.chat.id}\n\nOn the dashboard`);
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
                        let pageStatus = results[0].domain ? `Active page: 1\n\n` : `Active page: 0\n\n`;
                        let updateDomain = results[0].domain ? `Update a domain name for a page: '/name REPLACE BY YOUR DOMAIN NAME'` : ``;
                        let updateApi = results[0].domain ? `Update a api key for a page: '/api REPLACE BY YOUR API KEY'` : ``;
                        let message = `Username: ${msg.chat.username}\n`+
                        `Your User ID: ${msg.chat.id}\n`+
                        `${domainMessage}`+
                        `Your subscription end date: ${formattedEndDate}\n\n`+
                        `${pageStatus}`+
                        `Create a page: /create\n`+
                        `Delete a page: /delete\n`+
                        `${updateDomain}\n`+
                        `${updateApi}\n\n`+
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
            bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nThe error: ${error}`);
            console.log(error)
        } else {
            if (results.length == 0) {
                keys.getKey(receivedText, (error, results) => {
                    if (error) {
                        bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                        bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nThe error: ${error}`);
                        console.log(error)
                        
                    } else {
                        if (results.length > 0 && results[0].status != 'activated') {
                            keys.updateKeyStatus(receivedText, 'activated', (error, results) => {
                                if (error) {
                                    bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                                    bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nError 101\n\nThe error: ${error}`);
                                    console.log(error)
                                }
                            })
                            bot.sendMessage(notificationId, `ID: ${chatId}\n\nActivate a new subscription of ${results[0].key_type} day`);
                            bot.sendMessage(chatId, `Thank you ${msg.chat.username} !\nYour ${results[0].key_type} day subscription is now available.`);
                            day = results[0].key_type
                            user.getUser(chatId, (error, results) => {
                                if (error) {
                                    bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                                    bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nError 102\n\nThe error: ${error}`);
                                    console.log(error)
                                } else {
                                    if (results.length > 0) {
                                        user.updateUserSubscription(chatId, day, (error, results) => {
                                            if (error) {
                                                bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                                                bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nError 103\n\nThe error: ${error}`);
                                                console.log(error)
                                            }
                                        })
                                    } else {
                                        user.createUser(chatId, null, null, null,(error, results) => {
                                            if (error) {
                                                bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                                                bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nError 104\n\nThe error: ${error}`);
                                                console.log(error)
                                            } else {
                                                bot.sendMessage(notificationId, `ID: ${chatId}\n\nNew client was created.`);
                                                user.updateUserSubscription(chatId, day, (error, results) => {
                                                    if (error) {
                                                        bot.sendMessage(chatId, "Sorry, there's an error.\nContact: @webcro_help");
                                                        bot.sendMessage(notificationId, `Error with ID: ${chatId}\n\nError 105\n\nThe error: ${error}`);
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
                            bot.sendMessage(notificationId, `ID: ${chatId}\n\n Try to input a invalid key.`);
                            bot.sendMessage(chatId, `I need a valid key to start.\nGet one free for 7 day with @webcro_help`);
                        }
                    }
                })

            }

        }
    })

    //bot.sendMessage(chatId, `I need a valid key to start.\nGet one free for 7 day with @webcro_help`);
});