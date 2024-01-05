const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

function createUser(userId, apiKey, subscriptionEndDate, domain, callback) {
    const query = 'INSERT INTO user (user_id, api_key, subscription_end_date, domain) VALUES (?, ?, ?, ?)';
    connection.query(query, [userId, apiKey, subscriptionEndDate, domain], (error, results) => {
        callback(error, results);
    });
}

function getUser(userId, callback) {
    const query = 'SELECT * FROM user WHERE user_id = ?';
    connection.query(query, [userId], (error, results) => {
        callback(error, results);
    });
}

function updateUser(userId, newApiKey, newSubscriptionEndDate, domain, callback) {
    const query = 'UPDATE user SET api_key = ?, subscription_end_date = ?, domain = ? WHERE user_id = ?';
    connection.query(query, [newApiKey, newSubscriptionEndDate, domain, userId], (error, results) => {
        callback(error, results);
    });
}

function updateDomainUser(userId, domain, callback) {
    const query = 'UPDATE user SET domain = ? WHERE user_id = ?';
    connection.query(query, [domain, userId], (error, results) => {
        callback(error, results);
    });
}

function updateAPIUser(userId, api, callback) {
    const query = 'UPDATE user SET api_key = ? WHERE user_id = ?';
    connection.query(query, [api, userId], (error, results) => {
        callback(error, results);
    });
}

function deleteUser(userId, callback) {
    const query = 'DELETE FROM user WHERE user_id = ?';
    connection.query(query, [userId], (error, results) => {
        callback(error, results);
    });
}
function updateUserSubscription(userId, day, callback){
    const query = 'UPDATE user SET subscription_end_date = DATE_ADD(NOW(), INTERVAL ? DAY) WHERE user_id = ?';
    connection.query(query, [day, userId], (error, results) => {
        callback(error, results);
    });
}

function checkingSubscriptionStatus(userId, callback){
    const query = 'SELECT user_id FROM user WHERE user_id = ? AND subscription_end_date > NOW()';
    connection.query(query, [userId], (error, results) => {
        callback(error, results);
    });
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserSubscription,
    checkingSubscriptionStatus,
    updateDomainUser,
    updateAPIUser
}

