// Require dependencies
const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const slug = require('slug');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
// const mongoose = require('mongoose');
require('dotenv').config();

var db = null
var url = process.env.DB_HOST;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})


const app = express()
var port = process.env.PORT || 3000;


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


//require modules
// const User = require('./models/user');
// const Date = require('./models/date');
const register = require('./functions/register');
const registerForm = require('./functions/registerform');

//routes
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  res.render('index')//route to index.ejs
})

app.get('/login', function(req, res) {
  res.render('login')//route to login.ejs
})

app.get('/registreren', register);
app.post('/registreren', registerForm);


app.get('/adddate', function(req, res) {
  res.render('add')//route to adddate.ejs
})

app.get('/profiel', function(req, res) {
  res.render('profile')//route to profile.ejs
})

app.get('/chats', function(req, res) {
  res.render('chats')//route to chats.ejs
})

// //form
// app.get('/', function(req, res){

//   req.checkBody('nameMovie', 'Naam van film is verpicht!').notEmpty();
  
//   let errors = req.validationErrors();

//   if(errors) {
//     res.render('add', {
//       errors: errors
//     });
//     console.log('Error bij nieuwe date');
//   } else {
//     let newDate = {
//       movie_name: req.body.nameMovie
//     }
//     console.log('nieuwe date is gelukt');
//   }
// });


// 404
app.use(function (req, res, next) {
    res.render('404')
})

app.listen(port, function(){
  console.log(`Poort ${port} is aan het runnen yo!`);
})
