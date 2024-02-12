// db/botLogModel.js
const { query } = require('../index'); // Adjust the import path as needed

// Create a new bot log entry
const addBotLog = async (userId, action, details) => {
    const sql = `
        INSERT INTO BotLogs (UserID, Action, Timestamp, Details)
        VALUES ($1, $2, NOW(), $3)
        RETURNING *;
    `;
    try {
        const { rows } = await query(sql, [userId, action, details]);
        return rows[0];
    } catch (error) {
        console.error('Error adding bot log:', error);
        throw error;
    }
};

// Retrieve bot logs by UserID
const getBotLogsByUserId = async (userId) => {
    const sql = 'SELECT * FROM BotLogs WHERE UserID = $1 ORDER BY Timestamp DESC;';
    try {
        const { rows } = await query(sql, [userId]);
        return rows;
    } catch (error) {
        console.error('Error retrieving bot logs:', error);
        throw error;
    }
};

// Optionally, you could implement functions to handle updates or deletions to bot logs,
// but typically, logs are append-only and not modified after creation.

module.exports = {
    addBotLog,
    getBotLogsByUserId
};
