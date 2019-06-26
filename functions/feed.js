// Require dependencies
const express = require('express');
const multer = require('multer');
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
function feed(req, res) {
    if (!req.session.user) {
  
      return res.redirect('/');
  
    } else {
      db.collection('user').find().toArray(done);
    }
  
    function done(err, data) {
      if (err) {
        next(err);
      } else {
        res.render('index', {
          data: data,
          user: req.session.user,
          title: "Cinedate feed"
        });
      }
    }
  }
  
  module.exports = feed;