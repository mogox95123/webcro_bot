-- Insert sample data into Subscriptions
INSERT INTO Subscriptions (Price, Duration, IsActive) VALUES
(30, 1, TRUE),
(120, 7, TRUE),
(300, 31, TRUE);

-- Assuming you have the Users table ready
INSERT INTO Users (Username, CreationDate, EmailRender, PasswordRender, ApiKeys) VALUES
('user1', NOW(), 'user1@example.com', 'password1', 'api_key_1'),
('user2', NOW(), 'user2@example.com', 'password2', 'api_key_2'),
('user3', NOW(), 'user3@example.com', 'password3', 'api_key_3');

-- Insert sample data into UserSubscriptions (assuming UserID and SubscriptionID values)
INSERT INTO UserSubscriptions (UserID, SubscriptionID, StartDate, EndDate, Status) VALUES
(1, 1, NOW(), NOW() + INTERVAL '1 day', 'Active'),
(2, 2, NOW(), NOW() + INTERVAL '7 days', 'Active'),
(3, 3, NOW(), NOW() + INTERVAL '31 days', 'Active');

-- Insert sample data into Payments (assuming UserSubscriptionID values)
INSERT INTO Payments (UserSubscriptionID, Amount, PaymentDate, IsSuccessful) VALUES
(1, 30, NOW(), TRUE),
(2, 120, NOW(), TRUE),
(3, 300, NOW(), TRUE);

-- Insert sample data into BotLogs (assuming UserID values)
INSERT INTO BotLogs (UserID, Action, Timestamp, Details) VALUES
(1, 'SubscriptionRenewal', NOW(), 'Renewed subscription for 1 day.'),
(2, 'SubscriptionCancellation', NOW(), 'Cancelled 7 days subscription.'),
(3, 'SubscriptionPurchase', NOW(), 'Purchased 31 days subscription.');
