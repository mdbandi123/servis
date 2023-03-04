// firebase-auth-middleware.js
const firebase = require('firebase-admin');

// Initialize the Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": "servis-1603b",
    "private_key_id": "50a513e234365e57cb74b91e206e2ba2b7f7d093",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCi3go55fOVewiD\n1sIoWBsRqQCnMJYp7xJ75ByF0v8CQWthOZf3fmKm4rf7FAVn8VIE+kF4nPbbcsmG\n2vkJNXJ8nHaDBMa7QcXwQg6TDOIbAlMQaaAmIb9vsK7oJ4CxvuYTcJch6H0y1gvY\nEnJmiksij9JDRgrKMVZdhceziHJivQ+sKwFsZY/Jgd7hM6rOLWzefb96uypzCSTb\nl6RjjCZ8YJ4Y4DFx6UBUDjUCUGHCzyaQDBU5rG2ix5MFWvmPz23gp8CgP7pELJdW\nLMLnrupQxUrWBEk9SwrhJZwU8uCHf6FXO+g/W8q5oVVxu59jHVV2S+uJBfVnM+Yn\nYY6tcqe7AgMBAAECggEAAUqbcCbCTgl3YXw+y+Ju9y6M4nErL6fv+0AteGOE7CKn\n/vxdl8kjxR5VG8471hLUIKqkrEJ/s/EZZ1Kt2NnYpOOkuO3nxC0FrHMJpIwx8B7j\nmQ9isAq3zDiYGnUoZcBqw0qy7Wzng+it7V0FaooRhcj4Ki+6/tbHUDSIXIRqIR2g\nGISOzb3JeQ6Bm3RrpIKTJ4d4mN6cxIi1E8lzVYQpQXmUwjael5Xn75k+nKOoLno9\njtLIFlnh3tQFotjTVF7QgnhpHNuRHsUkyByUZCku9R+EPl7mUoEJ4sNFYcrG8DHa\nDro8eqyJsNjzENzBBg7Dh2f777Jjh4V+CAKAzCHFOQKBgQDSJl3QHq45wrLYAD7Q\n/xmLq26ldj3ud5u7ZYwoK3cTUYa5GfEj2lrDDipAdbIPK6Gjipjg+CR/LeL48VKd\nWlmpajB20CAHC5xCmdvX+my4m8qEKCj6nTdOUb3Zxi+Kes/r6suk5HnRkKX+Fqc6\n8L3+UNIy4lVhZAsiNUxMopgL1QKBgQDGZsXPH8aAeB9TazSt/+eLboXC+9jgcj55\nzXjJvdT7X1BWZobgf4BGV91IhEaPR/xlbrRGQOOdUPwE4LySyyWHZr3GUIcpcuRM\nPDheAAYJKStdejmMqUJX/6VuCbelYDUV20xdLguqpKSupJG9NjZ9+ttroXBs+Z/f\nSQOeV8B9TwKBgQCSA9ZrJOYpe/6H1qPO03EMerEGhoHBj5nFO2mG/6xc3+ib9Ep4\nft9RaCYzY5O0trw4xbQznDa/p0Jtdj/Q1VY3QHEsHLAkNQz9uannBzlDi/vKl5zh\nhRtIb8NZ7TpbHboaUantiFKcKcUsJtFLQrrAWaezc0+fu8OAoUfCd7btgQKBgQCT\nT/nt+aT0/Lwdv0slKw6sa8rr5P26YXlcDSFzgf0jDDllfckF5gXDtTe7wWN2vbd9\nRP6b71BSHbCSmp/Jywa5i6K7Hk3Ni95RcKFVwmS45pWpWbhjZcW5+zrFAngWVeH0\nsZj40ticwpT4i38e46MAVYQYXY1RjOOU8ey65GMrZwKBgQCiMPs6PIjHZtbKcPJL\nwoc1Mvm3D8ggoG27LBZMglbH6767/2MTcFNL+cOxj558E6wHTI++o2npH3Q2UHTr\n5YdGGuPX7wNyVrpeOZ9RJ5SyA2vdf3kELiRmbyg0RAf8Ov8Q/Jr4XJQBJtmkLSqH\n8/V0K65/eaNywgRb8WbPioTsxg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-cnxj2@servis-1603b.iam.gserviceaccount.com",
    "client_id": "108781244415096372720",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cnxj2%40servis-1603b.iam.gserviceaccount.com"
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
