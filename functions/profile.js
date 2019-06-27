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
function profile(req, res) {

    if(req.session.user) {
        var id = req.session.user._id;
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
      res.render('profile', { user: data, title: "Profile" })
      
    }
  }
}

module.exports = profile;