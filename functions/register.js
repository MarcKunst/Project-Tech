// Require dependencies
const express = require('express')
const camelCase = require('camelcase');
const bodyParser = require('body-parser');
const multer = require('multer');
const slug = require('slug');
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express()
const port = 3000

// Function
function register(req, res) {
    res.render('register');
}

module.exports = register;