const { query } = require('../index'); // Adjust the import path based on your project structure

// Create a new subscription type
const addSubscription = async (SubscriptionID, price, duration) => {
    const sql = `
        INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive)
        VALUES ($1, $2, $3, TRUE)
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [SubscriptionID, price, duration]);
        return rows[0];
    } catch (error) {
        console.error('Error adding subscription:', error);
        throw error;
    }
};

// Retrieve all subscription types
const getAllSubscriptions = async () => {
    const sql = 'SELECT * FROM Subscriptions;';
    try {
        const { rows } = await query(sql);
        return rows;
    } catch (error) {
        console.error('Error retrieving subscriptions:', error);
        throw error;
    }
};

// Update a subscription type
const updateSubscription = async (subscriptionId, price, duration, isActive) => {
    const sql = `
        UPDATE Subscriptions
        SET Price = $2, Duration = $3, IsActive = $4
        WHERE SubscriptionID = $1
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [subscriptionId, price, duration, isActive]);
        return rows[0];
    } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }
};

// Delete a subscription type
const deleteSubscription = async (subscriptionId) => {
    const sql = 'DELETE FROM Subscriptions WHERE SubscriptionID = $1 RETURNING *;';
    try {
        const { rows } = await query(sql, [subscriptionId]);
        return rows[0]; // This returns the deleted subscription object
    } catch (error) {
        console.error('Error deleting subscription:', error);
        throw error;
    }
};

module.exports = {
    addSubscription,
    getAllSubscriptions,
    updateSubscription,
    deleteSubscription
};
