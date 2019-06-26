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
function remove(req, res) {
  if (!req.session.user){

    return res.redirect('/')
  }
  else {
          req.checkBody('confirm', "Bevestig dat je het account wil verwijderen").notEmpty();

          var errors = req.validationErrors();

      if (errors) {
        res.render('deleteAccount', {
            errors: errors,
            user: req.session.user,
            title: "Delete account"
        });
      } else {
      var sessionID = req.session.user;
      var accountID = sessionID._id;
      var ObjectID = require('mongodb').ObjectID;

      db.collection('user').removeOne(
        { _id: ObjectID(accountID) }
      , done);
      console.log('account verwijderd');
      }
}

  function done(err, data) {
    if (err) {
      next(err)
    } else {
        req.session.destroy(function(err) {
          if (err) {
            next(err);
          } else {
              setTimeout(function () {
                res.redirect('/');
              }, 3000);
          }
        })
    }
  }
}
module.exports = remove;