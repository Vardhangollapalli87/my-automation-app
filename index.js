const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.send("<h1>HELLO FROM A_Z AUTOMATION<h1>",contentType="text/html");
})

app.listen(3020,()=>{
    console.log(`server is running on http://localhost:3020`);
})