CREATE DATABASE webcro_bot;

CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY,
    api_key VARCHAR(255),
    subscription_end_date DATETIME
);

CREATE TABLE `keys` (
    key_id VARCHAR(255) PRIMARY KEY,
    key_type ENUM('1', '7', '31') NOT NULL,
    status ENUM('sold', 'activated') NOT NULL
);


INSERT INTO `keys` (key_id, key_type, status) VALUES
('NCB87IJKOBP801U3R8176Q27', '7', 'sold'),
('VIDD2LF04W5AWPU7KXGVY1Y1', '7', 'sold'),
('H7WX0K6NA1JV7N9CG6ML28NF', '7', 'sold'),
('M1OZ9C4MPSW1JBR1W0Y7EIS0', '7', 'sold'),
('QKRFGY40BH2NN97GQNMP09HO', '7', 'sold'),
('GMNXC7Z49DDBXBY85ROBVAU8', '7', 'sold'),
('JYDMM8XSB2RR1JFN1LBS72TX', '7', 'sold'),
('UQ7Y07NCE6Y5B2AIBY05BTQA', '7', 'sold'),
('5VA3V7YECK7BVZX0CWJMUW3O', '7', 'sold'),
('NOOO2LVTXV2V3YQHE1LSCDTQ', '7', 'sold');
