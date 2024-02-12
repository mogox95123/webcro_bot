// db/userModel.js
const { query } = require('../index'); // Ensure this path is correct for your project structure

// Create: Add a new user
const addUser = async (user) => {
    const { userId, username, creationDate, emailRender, passwordRender, apiKeys } = user;
    const sql = `
        INSERT INTO users (user_id, username, creation_date, email_render, password_render, api_keys)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [userId, username, creationDate, emailRender, passwordRender, apiKeys];
    try {
        const { rows } = await query(sql, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Read: Get a user by UserID
const getUserById = async (userId) => {
    const sql = 'SELECT * FROM users WHERE user_id = $1;';
    try {
        const { rows } = await query(sql, [userId]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// Update: Modify user details
const updateUser = async (userId, updates) => {
    // Example for email and password update, adjust according to your needs
    const { emailRender, passwordRender, apiKeys } = updates;
    const sql = `
        UPDATE users
        SET email_render = $2, password_render = $3, api_keys = $4
        WHERE user_id = $1
        RETURNING *;
    `;
    const values = [userId, emailRender, passwordRender, apiKeys];
    try {
        const { rows } = await query(sql, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Delete: Remove a user from the database
const deleteUser = async (userId) => {
    const sql = 'DELETE FROM users WHERE user_id = $1 RETURNING *;';
    try {
        const { rows } = await query(sql, [userId]);
        return rows[0]; // Returns the deleted user object
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addUser,
    getUserById,
    updateUser,
    deleteUser
};
