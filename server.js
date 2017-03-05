'use strict'

// libraries
const express = require('express');

// constants
const PORT = 8080;

const app = express();
app.get('/', function(req, res){
    res.send("Hello world\n");    
});

app.listen(PORT);
console.log("Running on http://localhost:" + PORT);
