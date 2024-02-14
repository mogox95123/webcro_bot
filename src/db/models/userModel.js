// db/userModel.js
const { query } = require('../index'); // Ensure this path is correct for your project structure

// Create: Add a new user
const addUser = async (user) => {
    const { userId, username, creationDate, emailRender, passwordRender, domain, apiKeys, vpsip, vpspassword } = user;
    const sql = `
        INSERT INTO users (UserID, Username, CreationDate, EmailRender, PasswordRender, domain, ApiKeys, vpsip, vpspassword)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
    const values = [userId, username, creationDate, emailRender, passwordRender, domain, apiKeys, vpsip, vpspassword];
    try {
        const { rows } = await query(sql, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Read: Get a user by UserID
const getUserById = async (userId) => {
    const sql = 'SELECT * FROM users WHERE UserID = $1;';
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
    const { emailRender, passwordRender, domain, apiKeys, vpsip, vpspassword } = updates;
    const sql = `
        UPDATE users
        SET EmailRender = $2, PasswordRender = $3, domain = $4, ApiKeys = $5, vpsip = $6, vpspassword = $7
        WHERE UserID = $1
        RETURNING *;
    `;
    const values = [userId, emailRender, passwordRender, domain ,apiKeys, vpsip, vpspassword];
    try {
        const { rows } = await query(sql, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Delete: Remove a user from the database
const deleteUser = async (userId) => {
    const sql = 'DELETE FROM users WHERE UserID = $1 RETURNING *;';
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
