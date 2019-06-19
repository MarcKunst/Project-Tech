// Require dependencies
const express = require('express')
const path = require('path');
const expressValidator = require('express-validator');
const mongo = require('mongodb');
require('dotenv').config();


const app = express()
const port = 3000

// Function
function addmovie(req, res) {
    res.render('add');
}

module.exports = addmovie;