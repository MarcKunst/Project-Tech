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

mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
})

const app = express();
const port = 3000;

// Function
function movieForm(req, res, next) {
    var id = req.session.user._id;
    db.collection('user').update({
        _id: new mongo.ObjectID(id)
    }, {
    $set: {
      movie: req.body.namemovie,
       },
    }, done);

    function done(err, data) {
      if (err) {
        next(err)
      } else {
        // set registered user session
        req.session.user = data;

        //Redirects the browser to the given path
        res.redirect('/');
      }
    }

}

module.exports = movieForm;