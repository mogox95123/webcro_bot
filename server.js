require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bot = require('./src/bot/botController'); // Import the bot controller
const { dbConfig } = require('./src/config'); // Database configuration
const { Pool } = require('pg'); // PostgreSQL client library

const createTable = async () => {
    const createTableQuery = `
    -- Create Users table
    CREATE TABLE IF NOT EXISTS Users (
        UserID BIGINT PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        CreationDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        EmailRender VARCHAR(255),
        PasswordRender VARCHAR(255),
        Domain VARCHAR(255),
        ApiKeys VARCHAR(255)
    );
    
    -- Create Subscriptions table
    CREATE TABLE IF NOT EXISTS Subscriptions (
        SubscriptionID VARCHAR(255) PRIMARY KEY,
        Price NUMERIC(10, 2) NOT NULL CHECK (Price IN (30, 120, 300)),
        Duration INT NOT NULL CHECK (Duration IN (1, 7, 31)),
        IsActive BOOLEAN DEFAULT TRUE
    );
    
    -- Create UserSubscriptions table
    CREATE TABLE IF NOT EXISTS UserSubscriptions (
        UserSubscriptionID SERIAL PRIMARY KEY,
        UserID BIGINT,
        SubscriptionID VARCHAR(255),
        StartDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        EndDate TIMESTAMP WITH TIME ZONE,
        Status VARCHAR(50) CHECK (Status IN ('Active', 'Expired', 'Inactive'))
    );
    
    -- Create Payments table
    CREATE TABLE IF NOT EXISTS Payments (
        PaymentID SERIAL PRIMARY KEY,
        UserSubscriptionID INT REFERENCES UserSubscriptions(UserSubscriptionID),
        Amount NUMERIC(10, 2) NOT NULL,
        PaymentDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        IsSuccessful BOOLEAN DEFAULT FALSE
    );
    
    -- Create BotLogs table
    CREATE TABLE IF NOT EXISTS BotLogs (
        LogID SERIAL PRIMARY KEY,
        UserID BIGINT REFERENCES Users(UserID),
        Action VARCHAR(255) NOT NULL,
        Timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        Details TEXT
    );
    
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

const insertTable = async () => {
    const insertTableQuery = `
    -- Inserting 1-Day Subscriptions
    INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
    ('IF7LE-8HPDC-4UDS1-BYA13-LDB7K', 30, 1, TRUE),
    ('IXDUY-V35GU-V295Q-0DR51-TFMML', 30, 1, TRUE),
    ('OE9EZ-87JLN-HZ94T-GIWGJ-T0FOF', 30, 1, TRUE),
    ('6O43M-AMCFX-FNIVT-9O50X-5HR6X', 30, 1, TRUE),
    ('4KH12-P36C5-RXXW0-GKPAJ-JUXYT', 30, 1, TRUE)
    ON CONFLICT (SubscriptionID)
    DO NOTHING;
    
    -- Inserting 7-Day Subscriptions
    INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
    ('KH9NH-AKRFF-6XFV4-E1D36-OGEAM', 120, 7, TRUE),
    ('K0FW0-X68IX-Y4B8S-3GU73-WIOON', 120, 7, TRUE),
    ('RGBG1-AALOQ-K1C6V-JLZJM-V2HQH', 120, 7, TRUE),
    ('8R65P-COEHZ-HPLYW-BQ72Z-7JT80', 120, 7, TRUE),
    ('6NJ35-R59F7-TZ0Z2-INSDM-LWZ1V', 120, 7, TRUE)
    ON CONFLICT (SubscriptionID)
    DO NOTHING;
    
    -- Inserting 31-Day Subscriptions
    INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
    ('URJXQ-KU1PP-G6P5D-NAMDG-XPNJW', 300, 31, TRUE),
    ('UAP6A-7FHS7-8ELH2-DQ3HD-6RYYX', 300, 31, TRUE),
    ('0QLQB-KKVXZ-TR2WL-9BP8C-LS7G7', 300, 31, TRUE),
    ('YHWVF-2E47P-7FBOM-1GXSP-X9JYQ', 300, 31, TRUE),
    ('WD9TV-HVZ5X-JPQPS-8DI3C-BMPRL', 300, 31, TRUE)
    ON CONFLICT (SubscriptionID)
    DO NOTHING;
    `;

    try {
        await pool.query(insertTableQuery);
        console.log('Insert to table successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
};

// Initialize database connection pool
const pool = new Pool(dbConfig);



pool.connect()
    .then(() => {
        console.log('Connected to database successfully');
        createTable();
        insertTable();
    })
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
