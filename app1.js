const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const mongodbUrl = 'mongodb+srv://may-13:bharath118@cluster0.zrqxmhu.mongodb.net/may-13?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodbUrl);

const unicornModel = require('./model/unicorns.model');


const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const studentsRouter = require('./routes/students')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req, res) => {
    res.send('hello i am express!')
})
app.get('/addstudents', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addStudent.html'))
})
app.use('/users', usersRouter)
app.use('/students', studentsRouter)

//unicorn

const unicornRouter = require('./routes/unicorn');

app.use('/getMaleUnicorns', unicornRouter)

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})