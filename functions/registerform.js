// Require dependencies
const express = require('express');
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const slug = require('slug');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
require('dotenv').config();
var upload = multer({ dest: 'static/upload/' });
var db = null;
var url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
})

const app = express();
const port = 3000;

// Function
function registerForm(req, res, next) {
    console.log('Hij werkt');

    

    db.collection('user').insertOne({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      profilepicture: req.file ? req.file.filename : null,
    }, done);


    function done(err, data) {
      if (err) {
        next(err)
      } else {
        // set registered user session
        req.session.user = data.ops[0];
        console.log(data.ops[0])
        //Redirects the browser to the given path
        res.redirect('/');
      }
    }

}

module.exports = registerForm;