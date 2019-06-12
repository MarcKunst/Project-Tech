// Require dependencies
const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const User = require('./models/user');
const Date = require('./models/date');
require('dotenv').config();



const app = express()
const port = 3000

//devine templating engine and path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view/pages'));

//static path
app.use(express.static(path.join(__dirname, 'static')))

//global variables
app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
});

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.lenght) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));



//Set up default mongoose connection
var mongoDB = 'mongodb://localhost/daterequest';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




//routes
app.post('/', function(req, res) {
  res.render('index')//route to index.ejs
})

app.get('/login', function(req, res) {
  res.render('login')//route to login.ejs
})

app.get('/registreren', function(req, res) {
  res.render('register')//route to register.ejs
})

app.get('/adddate', function(req, res) {
  res.render('add')//route to adddate.ejs
})

app.get('/profiel', function(req, res) {
  res.render('profile')//route to profile.ejs
})

app.get('/chats', function(req, res) {
  res.render('chats')//route to chats.ejs
})

//form
app.get('/', function(req, res){

  req.checkBody('nameMovie', 'Naam van film is verpicht!').notEmpty();
  
  let errors = req.validationErrors();

  if(errors) {
    res.render('add', {
      errors: errors
    });
    console.log('Error bij nieuwe date');
  } else {
    let newDate = {
      movie_name: req.body.nameMovie
    }
    console.log('nieuwe date is gelukt');
  }
});


// 404
app.use(function (req, res, next) {
    res.render('404')
})

app.listen(port, function(){
  console.log(`Poort ${port} is aan het runnen yo!`);
})
