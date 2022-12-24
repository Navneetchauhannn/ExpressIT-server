const express = require('express');
const router = express.Router();

var admin = require('firebase-admin');
var appp = admin.initializeApp(process.env.CUSTOMCONNSTR_MY_SECREATE_KEY);
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