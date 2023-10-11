const bcrypt = require("bcrypt");
const saltRounds = 10;

// Hash a password before storing it
bcrypt.hash(userPassword, saltRounds, (err, hash) => {
  if (err) {
    // Handle error
  } else {
    // Store 'hash' in the database
  }
});

// Verify a password during login
bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  if (result) {
    // Passwords match, allow access
  } else {
    // Passwords do not match, deny access
  }
});
