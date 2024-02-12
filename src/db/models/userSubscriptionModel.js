// db/userSubscriptionModel.js
const { query } = require('../index'); // Ensure the import path is correct

// Add a new user subscription
const addUserSubscription = async (userId, subscriptionId, startDate, endDate, status) => {
    const sql = `
        INSERT INTO UserSubscriptions (UserID, SubscriptionID, StartDate, EndDate, Status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [userId, subscriptionId, startDate, endDate, status]);
        return rows[0];
    } catch (error) {
        console.error('Error adding user subscription:', error);
        throw error;
    }
};

// Retrieve subscriptions by UserID
const getSubscriptionsByUserId = async (userId) => {
    const sql = 'SELECT * FROM UserSubscriptions WHERE UserID = $1;';
    try {
        const { rows } = await query(sql, [userId]);
        return rows;
    } catch (error) {
        console.error('Error retrieving user subscriptions:', error);
        throw error;
    }
};

// Update a user subscription
const updateUserSubscription = async (userSubscriptionId, updates) => {
    const { startDate, endDate, status } = updates;
    const sql = `
        UPDATE UserSubscriptions
        SET StartDate = COALESCE($2, StartDate),
            EndDate = COALESCE($3, EndDate),
            Status = COALESCE($4, Status)
        WHERE UserSubscriptionID = $1
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [userSubscriptionId, startDate, endDate, status]);
        return rows[0];
    } catch (error) {
        console.error('Error updating user subscription:', error);
        throw error;
    }
};

// Delete a user subscription
const deleteUserSubscription = async (userSubscriptionId) => {
    const sql = 'DELETE FROM UserSubscriptions WHERE UserSubscriptionID = $1 RETURNING *;';
    try {
        const { rows } = await query(sql, [userSubscriptionId]);
        return rows[0]; // Returns the deleted user subscription object
    } catch (error) {
        console.error('Error deleting user subscription:', error);
        throw error;
    }
};

module.exports = {
    addUserSubscription,
    getSubscriptionsByUserId,
    updateUserSubscription,
    deleteUserSubscription
};
