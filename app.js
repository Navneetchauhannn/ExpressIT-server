const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
console.log("Server started");
app.get('/',(req,res)=>{
        res.send("Hello");
})

app.listen(port); 
