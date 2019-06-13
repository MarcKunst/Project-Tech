// Require dependencies
const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const slug = require('slug');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
// const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = 3000

// Function
function registerForm(req, res, next) {

      db.collection('user').insertOne({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.first-name,
      lastName: req.body.last-name
    //   age: req.body.age,
    //   gender: req.body.gender,
    //   profilepicture: req.file ? req.file.filename : null,
    }, done)

    function done(err, data) {
      if (err) {
        next(err)
      } else {
        //Redirects the browser to the given path
        res.redirect('/' + data.insertedId)
        console.log(data.insertedId)
      }
    }

}

module.exports = registerForm;