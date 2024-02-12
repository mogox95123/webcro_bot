-- Create Users table
CREATE TABLE Users (
    UserID BIGINT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    CreationDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    EmailRender VARCHAR(255),
    PasswordRender VARCHAR(255),
    ApiKeys TEXT
);

-- Create Subscriptions table
CREATE TABLE Subscriptions (
    SubscriptionID VARCHAR(255) PRIMARY KEY,
    Price NUMERIC(10, 2) NOT NULL CHECK (Price IN (30, 120, 300)),
    Duration INT NOT NULL CHECK (Duration IN (1, 7, 31)),
    IsActive BOOLEAN DEFAULT TRUE
);

-- Create UserSubscriptions table
CREATE TABLE UserSubscriptions (
    UserSubscriptionID SERIAL PRIMARY KEY,
    UserID BIGINT REFERENCES Users(UserID),
    SubscriptionID VARCHAR(255) REFERENCES Subscriptions(SubscriptionID),
    StartDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    EndDate TIMESTAMP WITH TIME ZONE,
    Status VARCHAR(50) CHECK (Status IN ('Active', 'Expired', 'Inactive'))
);

-- Create Payments table
CREATE TABLE Payments (
    PaymentID SERIAL PRIMARY KEY,
    UserSubscriptionID INT REFERENCES UserSubscriptions(UserSubscriptionID),
    Amount NUMERIC(10, 2) NOT NULL,
    PaymentDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    IsSuccessful BOOLEAN DEFAULT FALSE
);

-- Create BotLogs table
CREATE TABLE BotLogs (
    LogID SERIAL PRIMARY KEY,
    UserID BIGINT REFERENCES Users(UserID),
    Action VARCHAR(255) NOT NULL,
    Timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Details TEXT
);
