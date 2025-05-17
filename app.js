const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const userModel = require('./model/User')
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
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

//store
const store = new MongoDBStore({
    uri: mongodbUrl,
    collection: "mySession"
})
//session
app.use(session({
    secret: 'this is player app',
    resave: false,
    saveUninitialized: false,
    store: store
}))

//checkauth middleware
const checkAuth = (req, res, next) => {
    if(req.session.isAuthenticated) {
        next()
    }else{
        res.redirect('/signup')
    }
}



//routers
const unicornRouter = require('./routes/unicorn');
const playersRouter = require('./routes/players');

//register get data
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('dashboard')
})

//players
app.use('/players', checkAuth, playersRouter);

//authentication
app.get('/signup', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard')
})

//authentication post
app.post('/register', async(req, res) => {
    
    const {username, email, password} = req.body;
    try{
        let user = await userModel.findOne({email});
        if(user) {
            return res.redirect('/signup');
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        user = new userModel({
            username,
            email,
            password: hashedPassword
        })
        req.session.person = user.username;
        await user.save()
        res.redirect('/login')
    }catch(err) {
        console.log(err);
        res.redirect('/signup')
    }
})

app.post('/user-login', async(req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    let checkPassword = false
    if(!user) {
        return res.redirect('/signup');
    }else{
        checkPassword = await bcrypt.compare(password, user.password);
    }
    if(!checkPassword) {
        return res.redirect('/signup');
    }
    req.session.isAuthenticated = true;
    res.redirect('/players')
})

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/signup')
    })
})

//unicorns
// app.use('/getMaleUnicorns', unicornRouter);




app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})

module.exports = checkAuth;