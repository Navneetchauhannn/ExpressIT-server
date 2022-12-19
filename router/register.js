const express = require('express');
const router = express.Router();
const path = require('path');

const myPath = path.join(__dirname, '../ServiceKey.json');

var admin = require('firebase-admin');
var appp = admin.initializeApp({
    credential: admin.credential.cert(myPath)
});
const db = appp.firestore();
let defaultAuth = admin.auth();

router.post('/register', async (req, res) => {
    console.log(req.body.deleteId);
    try {
        const newid = req.body.deleteId;
        console.log(newid);
        await defaultAuth.deleteUser(`${newid}`);
        try {
            await db.collection('Users').doc(`${newid}`).delete();
            console.log("Data deleted successfully");
            res.status(200).json({message: "Suucess"});
        }
        catch (error) {
            console.log(error);
            res.status(400).json({message: "Failed"});
        }
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = router;