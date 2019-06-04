const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const User = require('./models/user');
const Date = require('./models/date');



const app = express()
const port = 3000


//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

//mongoose
mongoose.connect('mongodb://localhost/daterequest', function (err) {
  if (err) throw err;

});

//routes
app.get('/', function(req, res) {
  res.render('index')//route to index.ejs
})

app.get('/adddate', function(req, res) {
  res.render('add')//route to date.ejs
})

app.get('/proposal_1.html', function(req, res) {
  res.sendFile(proposal_1.html)//route to html
})

app.get('/choose_movie.html', function(req, res) {
  res.sendFile(choose_movie.html)//route to html
})

//form
app.post('/', function(req, res){

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
