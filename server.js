const express = require('express')
const app = express()
const port = 3000


app.use(express.static('static'))
// here you set that you're using `ejs` template engine, and the
// default extension is `ejs`
app.set('view engine', 'ejs');

app.get('/proposal_1.html', function(req, res) {
  res.sendFile(proposal_1.html)
})

app.get("/image", function(request, response) {
  response.render("image");
 });
// (req, res) => res.sendFile(proposal_1.html))
// app.get('/images/logo_cinedate.png', (req, res) => res.sendFile(images/logo_cinedate.png))
// 404
app.use(function (req, res, next) {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))