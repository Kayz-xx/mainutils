const admin = require("firebase-admin");
require("dotenv").config();


const config = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": "firebase-adminsdk-o0cli@discord-beta-b3add.iam.gserviceaccount.com",
  "client_id": "106644098161125900881",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o0cli%40discord-beta-b3add.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://discord-beta-b3add-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
  

module.exports = {
    db: admin.database()
  };

