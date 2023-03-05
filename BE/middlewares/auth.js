// firebase-auth-middleware.js
const firebase = require('firebase-admin');
require ('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

// Initialize the Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

// A middleware function to verify the Firebase ID token
const firebaseAuth = async (req, res, next) => {
  try {
    // Get the Firebase ID token from the request header
    const idToken = req.headers.authorization;

    // Verify the ID token and decode its payload
    const decodedIdToken = await firebase.auth().verifyIdToken(idToken);

    // Attach the decoded ID token to the request object for future use
    req.user = decodedIdToken;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the ID token is invalid, return a 401 Unauthorized error
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = firebaseAuth;
