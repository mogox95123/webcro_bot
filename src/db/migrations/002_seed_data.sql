-- Inserting 1-Day Subscriptions
INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
('IF7LE-8HPDC-4UDS1-BYA13-LDB7K', 30, 1, TRUE),
('IXDUY-V35GU-V295Q-0DR51-TFMML', 30, 1, TRUE),
('OE9EZ-87JLN-HZ94T-GIWGJ-T0FOF', 30, 1, TRUE),
('6O43M-AMCFX-FNIVT-9O50X-5HR6X', 30, 1, TRUE),
('4KH12-P36C5-RXXW0-GKPAJ-JUXYT', 30, 1, TRUE);

-- Inserting 7-Day Subscriptions
INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
('KH9NH-AKRFF-6XFV4-E1D36-OGEAM', 120, 7, TRUE),
('K0FW0-X68IX-Y4B8S-3GU73-WIOON', 120, 7, TRUE),
('RGBG1-AALOQ-K1C6V-JLZJM-V2HQH', 120, 7, TRUE),
('8R65P-COEHZ-HPLYW-BQ72Z-7JT80', 120, 7, TRUE),
('6NJ35-R59F7-TZ0Z2-INSDM-LWZ1V', 120, 7, TRUE);

-- Inserting 31-Day Subscriptions
INSERT INTO Subscriptions (SubscriptionID, Price, Duration, IsActive) VALUES
('URJXQ-KU1PP-G6P5D-NAMDG-XPNJW', 300, 31, TRUE),
('UAP6A-7FHS7-8ELH2-DQ3HD-6RYYX', 300, 31, TRUE),
('0QLQB-KKVXZ-TR2WL-9BP8C-LS7G7', 300, 31, TRUE),
('YHWVF-2E47P-7FBOM-1GXSP-X9JYQ', 300, 31, TRUE),
('WD9TV-HVZ5X-JPQPS-8DI3C-BMPRL', 300, 31, TRUE);

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
