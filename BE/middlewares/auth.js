// firebase-auth-middleware.js
const firebase = require('firebase-admin');
require ('dotenv').config();

// Initialize the Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, ''),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  }),
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
