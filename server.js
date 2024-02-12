require('dotenv').config(); // Load environment variables from .env file
const bot = require('./src/bot/botController'); // Import the bot controller
const { dbConfig } = require('./src/config'); // Database configuration
const { Pool } = require('pg'); // PostgreSQL client library

// Initialize database connection pool
const pool = new Pool(dbConfig);

pool.connect()
    .then(() => console.log('Connected to database successfully'))
    .catch((err) => console.error('Database connection failed', err));

    
// Notify the console that the bot has started
console.log('Bot has been started...');

// You can also set up express or any other HTTP server here if your bot needs to interact with webhooks or provide an HTTP API
