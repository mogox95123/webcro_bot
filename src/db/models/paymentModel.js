// db/paymentModel.js
const { query } = require('../index'); // Ensure the import path is correct for your project structure

// Create a new payment record
const addPayment = async (userSubscriptionId, amount, paymentDate, isSuccessful) => {
    const sql = `
        INSERT INTO Payments (UserSubscriptionID, Amount, PaymentDate, IsSuccessful)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [userSubscriptionId, amount, paymentDate, isSuccessful]);
        return rows[0];
    } catch (error) {
        console.error('Error adding payment:', error);
        throw error;
    }
};

// Retrieve payments by UserSubscriptionID
const getPaymentsByUserSubscriptionId = async (userSubscriptionId) => {
    const sql = 'SELECT * FROM Payments WHERE UserSubscriptionID = $1;';
    try {
        const { rows } = await query(sql, [userSubscriptionId]);
        return rows;
    } catch (error) {
        console.error('Error retrieving payments:', error);
        throw error;
    }
};

// Update a payment record
const updatePayment = async (paymentId, updates) => {
    // Build the SQL query dynamically based on provided updates
    const { amount, paymentDate, isSuccessful } = updates;
    const sql = `
        UPDATE Payments
        SET Amount = COALESCE($2, Amount),
            PaymentDate = COALESCE($3, PaymentDate),
            IsSuccessful = COALESCE($4, IsSuccessful)
        WHERE PaymentID = $1
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [paymentId, amount, paymentDate, isSuccessful]);
        return rows[0];
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error;
    }
};

// Delete a payment record
const deletePayment = async (paymentId) => {
    const sql = 'DELETE FROM Payments WHERE PaymentID = $1 RETURNING *;';
    try {
        const { rows } = await query(sql, [paymentId]);
        return rows[0]; // Returns the deleted payment object
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error;
    }
};

module.exports = {
    addPayment,
    getPaymentsByUserSubscriptionId,
    updatePayment,
    deletePayment
};
