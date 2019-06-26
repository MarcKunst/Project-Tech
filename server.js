// Require dependencies
const express = require('express');
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const slug = require('slug');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
const session = require('express-session');
require('dotenv').config();
var upload = multer({ dest: 'static/upload/' });
var db = null;
var url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});


const app = express();
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
const register = require('./functions/register');
const addmovie = require('./functions/addmovie');
const registerForm = require('./functions/registerform');
const loginForm = require('./functions/loginform');
const movieForm = require('./functions/movieform');
const profile = require('./functions/profile');
const feed = require('./functions/feed');
const deleteAccount = require('./functions/deleteAccount');
const remove = require('./functions/remove');

//routes
app.use(bodyParser.urlencoded({ extended: true }));

// sessions
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

const sessionChecker = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.get('/', sessionChecker, feed);

app.get('/login', function(req, res) {
  res.render('login');//route to login.ejs
})

app.post('/login', loginForm);

app.get('/logout', function(req, res) {
  console.log(req.session);
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect('/');
})

app.get('/registreren', register);
app.post('/registreren', upload.single('profilepicture'), registerForm);

app.get('/adddate', sessionChecker, addmovie);
app.post('/adddate', movieForm);

app.get('/profiel', sessionChecker, profile);

app.get('/deleteAccount', sessionChecker, deleteAccount);
app.post('/deleteAccount', remove);


app.get('/chats', sessionChecker, function(req, res) {
  res.render('chats');//route to chats.ejs
})


// 404
app.use(function (req, res, next) {
    res.render('404');
});

app.listen(port, function(){
  console.log(`Poort ${port} is aan het runnen yo!`);
});
