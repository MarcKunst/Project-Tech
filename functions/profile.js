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
function profile(req, res) {

    if(req.session.user) {
        var id = req.session.user.id;
        db.collection('user').findOne({
          _id: mongo.ObjectID(id)
        }, done);
    } else {
        res.redirect('/');
    }

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      if(req.session.user) {
        res.render('profile', { data: data, user: req.session.user, title: "Profile" })
      } else {
        res.render('/');
      }
    }
  }
}

module.exports = profile;