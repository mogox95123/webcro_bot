const { getUserById, updateUser } = require('../db/models/userModel');
const { addUserSubscription, getSubscriptionsByUserId, updateUserSubscription } = require('../db/models/userSubscriptionModel');
const { addPayment } = require('../db/models/paymentModel');
const { getAllSubscriptions, updateSubscription } = require('../db/models/subscriptionModel');
const { isSubscriptionActive, formatDate } = require('../utils/helperFunctions')
const axios = require('axios');

// Function to handle new subscriptions
async function handleNewSubscription(userId, subscriptionId) {
    try {
        const subscriptions = await getAllSubscriptions();
    
        const subscription = subscriptions.find(sub => sub.subscriptionid === subscriptionId);
      
        if (!subscription || subscription.isactive != true) {
            return { success: false, message: "Subscription type not found." };
        }

        subscription.isactive = false;

        await updateSubscription(subscription.subscriptionid, subscription.price, subscription.duration, subscription.isactive)

        // Assume function to calculate endDate based on subscription duration
        const endDate = calculateEndDate(subscription.duration);

        // Add a new user subscription
        await addUserSubscription(userId, subscription.subscriptionid, new Date(), endDate, 'Active');

        return { success: true, message: "Subscription added successfully." };
    } catch (error) {
        console.error('Error handling new subscription:', error);
        return { success: false, message: "An error occurred while processing your subscription." };
    }
}

// Function to fetch user subscription status
async function getUserSubscriptionStatus(userId) {
    try {
        const subscriptions = await getSubscriptionsByUserId(userId);
        const activeSubscription = subscriptions.find(sub => sub.status === 'Active');
        if (activeSubscription) {
            const bool = isSubscriptionActive(subscriptions.endDate)
            if(bool){
                subscriptions.status = 'Expired'
                await updateUserSubscription(subscriptions.usersubscriptionid, subscriptions)

                return { success: true, active: false };
            } else {
                return { success: true, active: true, details: activeSubscription };
            }
        }
        return { success: true, active: false, message: "No active subscription found." };
    } catch (error) {
        console.error('Error fetching user subscription status:', error);
        return { success: false, message: "An error occurred while fetching subscription status." };
    }
}

// Placeholder function for calculating the end date based on duration
function calculateEndDate(duration) {
    // Implement logic based on your needs
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
}

async function dashboard(userId){
    try{
        const user = await getUserById(userId);
        const userSubscription = await getSubscriptionsByUserId(userId);
        const activeSubscription = userSubscription.find(sub => sub.status === 'Active');

        let message = `🌟 User Dashboard 🌟\n`;
        message += `Hello! Here's a quick overview of your account details and subscription status:\n\n🔑 User ID: ${user.userid}\n\n🌐 Domain: ${user.domain || ''}\n\n🛠️ API Keys: ${user.apikeys || ''}\n\nVPS IP: ${user.vpsip}\n\nVPS Password: ${user.vpspassword}\n\n`;
        message += `📆 Subscription Details:\n\n`;
        message += `Subscription ID: ${activeSubscription.subscriptionid}\nEnd Date: ${formatDate(activeSubscription.enddate)}\nStatus: ${activeSubscription.status} 🎉\n\n`;
        message += `Quick Actions:\n\n`
        message += `🔄 Create a page - /create\n\nFor any assistance, contact @webcro_help to find out more about what you can do!`;
        
        return{success:true, message:message}
    }catch(error){
        console.error('Error fetching user information:', error);
        return {success: false, message:"An error occurred while fetching user information."}
    }
    
}

async function setUserInfoForCreatingPage(msg, chatId){
    try{
        
        const data = msg.text.split(',');
        if (data.length === 5) {
            const user = await getUserById(chatId);
            const info = {
                apiKey: data[0].trim(),
                vpsIp: data[1].trim(),
                vpsPassword: data[2].trim(),
                RECAPTCHA_SECRET_KEY: data[3].trim(),
                RECAPTCHA_SITE_KEY: data[4].trim()
            }

            user.apiKeys = info.apiKey;
            user.vpsip = info.vpsIp;
            user.vpspassword = info.vpsPassword;
            
            await updateUser(chatId, user)
            
    
            return {success:true, message: 'Thank you for the information. We will proceed with the setup.\n\nWait for the domain to appear.', info: info}
        }

    } catch(error) {
        console.error('Error fetching user information:', error);
        return {success: false, message:"An error occurred while fetching user information."}
    }
}

async function createPage(){
    try{
        let message = `🔐Information Request🔐\n\n***Currently, we have the Interac page available for you. Our team is working hard to bring more pages very soon. Stay tuned for exciting updates!***\n\n`;
        message += `To set up the page, we need a few details. Please reply with the following information:\n`;
        message += `1. Telegram Bot API Key\n2. VPS IP Address\n3. VPS Password\n4. RECAPTCHA SECRET KEY\n5. RECAPTCHA SITE KEY\n\n`;
        message += `Reply in the format: \`API_KEY, IP_ADDRESS, PASSWORD, RECAPTCHA_SECRET_KEY, RECAPTCHA_SITE_KEY\``;

        return {success:true, message:message};
    } catch(error){
        console.error('Error fetching user information:', error);
        return {success: false, message:"An error occurred while fetching user information."}
    }
}

module.exports = {
    handleNewSubscription,
    getUserSubscriptionStatus,
    dashboard,
    createPage,
    setUserInfoForCreatingPage
};
