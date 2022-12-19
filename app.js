const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(require('./router/register'));
console.log("Server started");
app.get('/',(req,res)=>{
        res.send("Hello");
})

app.listen(port); 