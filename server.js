//console.log('hello')
const express = require("express");
const errorHandler = require("./pr");
const app = express();
const port = 5000;

const bodyParser = require('body-parser');

app.use("/api/contacts",require("./pr"));

app.use(express.json());

app.use(pr);
app.listen(port,()=>{
    console.log(`running at port ${port}`);
});
