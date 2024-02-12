-- Drop all tables in reverse order of creation to avoid foreign key constraint issues

-- Drop BotLogs table
DROP TABLE IF EXISTS BotLogs CASCADE;

-- Drop Payments table
DROP TABLE IF EXISTS Payments CASCADE;

-- Drop UserSubscriptions table
DROP TABLE IF EXISTS UserSubscriptions CASCADE;

-- Drop Subscriptions table
DROP TABLE IF EXISTS Subscriptions CASCADE;

-- Drop Users table
DROP TABLE IF EXISTS Users CASCADE;
