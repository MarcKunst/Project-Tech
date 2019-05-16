const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', (req, res) => res.send('This is the about page'))

app.get('/login', (req, res) => res.send('This is were you can log in'))
// 404
app.use(function (req, res, next) {
    res.status(404).send("404 Sorry can't find that!")
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))