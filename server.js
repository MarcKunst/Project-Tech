const express = require('express')
const app = express()
const port = 3000

app.use(express.static('static'))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', (req, res) => res.send('This is the about page'))

app.get('/login', (req, res) => res.send('This is were you can log in'))

app.get('/images/avocado.png', (req, res) => res.sendFile(images/avocado.png))

app.get('/css/style.css', (req, res) => res.sendFile(css/style.css))

app.get('/js/index.js', (req, res) => res.sendFile(js/index.js))

// 404
app.use(function (req, res, next) {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))