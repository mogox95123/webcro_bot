const mysql = require('mysql');
const dbConfig = require('./config/dbConfig');

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

function createKey(keyId, keyType, callback) {
    const query = 'INSERT INTO `keys` (key_id, key_type, status) VALUES (?, ?, "sold")';
    connection.query(query, [keyId, keyType], (error, results) => {
        callback(error, results);
    });
}

function getKey(keyId, callback) {
    const query = 'SELECT * FROM `keys` WHERE key_id = ?';
    connection.query(query, [keyId], (error, results) => {
        callback(error, results);
    });
}

function updateKeyStatus(keyId, newStatus, callback) {
    const query = 'UPDATE `keys` SET status = ? WHERE key_id = ?';
    connection.query(query, [newStatus, keyId], (error, results) => {
        callback(error, results);
    });
}

function deleteKey(keyId, callback) {
    const query = 'DELETE FROM `keys` WHERE key_id = ?';
    connection.query(query, [keyId], (error, results) => {
        callback(error, results);
    });
}


module.exports = {
createKey,
getKey,
updateKeyStatus,
deleteKey
}