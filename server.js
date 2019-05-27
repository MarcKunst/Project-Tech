const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');


const app = express()
const port = 3000


app.use(express.static('static')) //middleware
app.set('view engine', 'ejs'); //devine templating engine

app.get('/proposal_1.html', function(req, res) {
  res.sendFile(proposal_1.html)//route to html
})

// 404
app.use(function (req, res, next) {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))