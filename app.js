const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

var admin = require('firebase-admin');

var appp = admin.initializeApp({   "type": process.env.CUSTOMCONNSTR_TYPE,   
"project_id": process.env.CUSTOMCONNSTR_PROJECT_ID,   
"private_key_id": process.env.CUSTOMCONNSTR_PRIVATE_KEY_ID,   
"private_key": process.env.CUSTOMCONNSTR_PRIVATE_KEY,   
"client_email": process.env.CUSTOMCONNSTR_CLIENT_EMAIL,   
"client_id": process.env.CUSTOMCONNSTR_CLIENT_ID,   
"auth_uri": process.env.CUSTOMCONNSTR_AUTH_URI,   
"token_uri": process.env.CUSTOMCONNSTR_TOKEN_URI,   
"auth_provider_x509_cert_url": process.env.CUSTOMCONNSTR_AUTH_PROVIDER,   
"client_x509_cert_url": process.env.CUSTOMCONNSTR_CLIENT_CERT_URI });

const db = appp.firestore();
let defaultAuth = admin.auth();

app.use(express.json());
console.log("Server started");
app.get('/', (req, res) => {
        res.send("Hello");
})

app.post('/register', async (req, res) => {
        console.log(req.body.deleteId);
        try {
                const newid = req.body.deleteId;
                console.log(newid);
                await defaultAuth.deleteUser(`${newid}`);
                try {
                        await db.collection('Users').doc(`${newid}`).delete();
                        console.log("Data deleted successfully");
                        res.status(200).json({ message: "Suucess" });
                }
                catch (error) {
                        console.log(error);
                        res.status(400).json({ message: "Failed" });
                }
        }
        catch (error) {
                console.log(error);
        }
})

app.listen(port);
console.log('started on: ', port);
