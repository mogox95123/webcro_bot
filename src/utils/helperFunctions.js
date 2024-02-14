// Utility function to format dates into a more readable string
function formatDate(date) {
    let isoString = date.toISOString();
    let datePart = isoString.split('T')[0]; // YYYY-MM-DD
    let timePart = isoString.split('T')[1].split(':'); // HH:mm:ss.sssZ
    return `${datePart} ${timePart[0]}:${timePart[1]}`; // YYYY-MM-DD HH:mm

}

// Function to validate email addresses
function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

// Function to encrypt passwords (placeholder for demonstration)
function encryptPassword(password) {
    // Placeholder: In a real application, use a library like bcrypt
    return `encrypted-${password}`;
}

// Function to check if a subscription is active based on its end date
function isSubscriptionActive(endDate) {
    const now = new Date();
    return endDate > now;
}

// Simple logger function for debugging
function logger(message) {
    console.log(`[${new Date().toISOString()}] - ${message}`);
}

module.exports = {
    formatDate,
    validateEmail,
    encryptPassword,
    isSubscriptionActive,
    logger
};
