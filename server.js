const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
let upload = multer()


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
mongoose.connect('mongodb://localhost/daterequest', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  let dateSchema = new mongoose.Schema({
    name: {
      first_name: String,
      last_name: String
    },
    profilePicture: Buffer,
    age: String,
    gender: String,
    movie_name: String,
    created: Date
  });


});

//routes
app.get('/', function(req, res) {
  res.render('index')//route to index.ejs
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
    res.render('index', {
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
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, function(){
  console.log(`Poort ${port} is aan het runnen yo!`);
})
