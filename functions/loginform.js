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

var db = null;
var url = process.env.MONGODB_URI;

mongo.MongoClient.connect(url, {
  useNewUrlParser: true
}, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
});

const app = express();
const port = 3000;

// Function
function loginForm(req, res, next) {
  console.log('Hij werkt');

  console.log(req.body);

  db.collection('user').findOne({
    email: req.body.email,
    password: req.body.password,
  }, done);


  function done(err, data) {
    if (err) {
      next(err);
    } else {
      // set registered user session
      req.session.user = data;

      //Redirects the browser to the given path
      res.redirect('/');
    }
  }

}

module.exports = loginForm;