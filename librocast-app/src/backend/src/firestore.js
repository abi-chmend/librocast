const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;
