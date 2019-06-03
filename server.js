const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
let upload = multer()


const app = express()
const port = 3000


//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static path
app.use(express.static(path.join(__dirname, 'static')))

//devine templating engine and path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view/pages'));


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

// 404
app.use(function (req, res, next) {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//form
app.post('/profile', upload.none(), function (req, res, next) {
  // req.body contains the text fields
})