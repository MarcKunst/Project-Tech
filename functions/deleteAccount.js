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
function deleteAccount(req, res) {
  if (!req.session.user){
    return res.redirect('/')
}else{
    db.collection('user').find().toArray(done);
  }
  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('deleteAccount', { data: data, user: req.session.user, title: "Delete account" })
    }
  }
}

module.exports = deleteAccount;