const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const methodOverride = require('method-override');
const PORT = 3000;

//pug
app.set('view engine', 'pug');

//method-override
app.use(methodOverride('_method'))

//bodyparser
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//mongooes
const mongodbUrl = 'mongodb+srv://may-13:bharath118@cluster0.zrqxmhu.mongodb.net/may-13?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodbUrl);

//routers
const unicornRouter = require('./routes/unicorn');
const playersRouter = require('./routes/players');


app.get('/', (req, res) => {
    res.send('hello')
})

//unicorns
// app.use('/getMaleUnicorns', unicornRouter);

//players
app.use('/players', playersRouter);


app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})