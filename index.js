// const express = require('express')
// const app = express()


// app.get('/',(req,res)=>{
//     res.send("<h1>HELLO FROM A_Z AUTOMATION</h1>",contentType="text/html");
// })

// app.listen(3020,()=>{
//     console.log(`server is running on http://localhost:3020`);
// })

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.type('html');
    res.send("<h1>HELLO FROM A_Z AUTOMATION</h1><h2>Welcome to our automation app!</h2>");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});