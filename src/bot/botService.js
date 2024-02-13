const { getUserById, updateUser } = require('../db/models/userModel');
const { addUserSubscription, getSubscriptionsByUserId, updateUserSubscription } = require('../db/models/userSubscriptionModel');
const { addPayment } = require('../db/models/paymentModel');
const { getAllSubscriptions } = require('../db/models/subscriptionModel');
const { isSubscriptionActive, formatDate } = require('../utils/helperFunctions')
const axios = require('axios');

// Function to handle new subscriptions
async function handleNewSubscription(userId, subscriptionId) {
    try {
        const subscriptions = await getAllSubscriptions();
        const subscription = subscriptions.find(sub => sub.subscriptionId === subscriptionId);

        if (!subscription) {
            return { success: false, message: "Subscription type not found." };
        }

        // Assume function to calculate endDate based on subscription duration
        const endDate = calculateEndDate(subscription.duration);

        // Add a new user subscription
        await addUserSubscription(userId, subscription.SubscriptionID, new Date(), endDate, 'Active');

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
        const activeSubscription = subscriptions.find(sub => sub.Status === 'Active');
        if (activeSubscription) {
            const bool = isSubscriptionActive(subscriptions.endDate)
            if(bool){
                subscriptions.status = 'Expired'
                subscriptions.updateUserSubscription(subscriptions.userSubscriptionId, subscriptions)

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
        let message = `🌟 User Dashboard 🌟\n`;
        message += `Hello! Here's a quick overview of your account details and subscription status:\n\n🔑 User ID: ${user.userId}\n\n🌐 Domain: ${user.domain || ''}\n\n🛠️ API Keys: ${user.apiKeys || ''}\n`;
        message += `📆 Subscription Details:\n\n`;
        message += `Subscription ID: ${userSubscription.subscriptionId}\nEnd Date: ${formatDate(userSubscription.endDate)}\nStatus: ${userSubscription.status} 🎉\n`;
        message += `Quick Actions:\n\n`
        message += `🔄 Create a page - /create\n\nFor any assistance, contact @webcro_help to find out more about what you can do!`;
        
        return{success:true, message:message}
    }catch(error){
        console.error('Error fetching user information:', error);
        return {success: false, message:"An errir occurred while fetching user information."}
    }
    
}

// Placeholder function for processing payment
async function processPayment(userId, amount) {
    // Implement payment processing logic
    // This could interact with an external payment gateway
    return true; // Simulate successful payment
}

module.exports = {
    handleNewSubscription,
    getUserSubscriptionStatus,
    dashboard
};
