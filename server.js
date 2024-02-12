require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bot = require('./src/bot/botController'); // Import the bot controller
const { dbConfig } = require('./src/config'); // Database configuration
const { Pool } = require('pg'); // PostgreSQL client library

// Initialize database connection pool
const pool = new Pool(dbConfig);

pool.connect()
    .then(() => console.log('Connected to database successfully'))
    .catch((err) => console.error('Database connection failed', err));

// Initialize Express
const app = express();

// Middlewares
app.use(express.json()); // For parsing application/json

// Define a simple route for GET requests to "/"
app.get('/', (req, res) => {
    res.send('Hello, World! Your bot is running.');
});

// More routes can be added here

// Telegram Bot webhook setup (optional)
// Make sure you replace 'YOUR_BOT_TOKEN' with your actual bot token
// and 'webhook_url' with your actual webhook URL
// bot.setWebHook('https://yourserver.com:443/bot' + YOUR_BOT_TOKEN);

// Listen on port 80
app.listen(80, () => {
    console.log('Express server is running on port 80');
});

// Notify the console that the bot has started
console.log('Bot has been started...');
