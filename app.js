const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


const unicornRouter = require('./routes/unicorn');


app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/getMaleUnicorns', unicornRouter)

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})