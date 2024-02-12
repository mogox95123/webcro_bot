require('dotenv').config();


const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
};

const dbConfigURL = {
    connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
    // Additional options like SSL can be configured here based on your PostgreSQL hosting requirements
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const botToken = process.env.TELEGRAM_BOT_API


module.exports = {
    dbConfig,
    dbConfigURL,
    botToken
};
