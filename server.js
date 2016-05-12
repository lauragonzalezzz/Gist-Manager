'use strict';

const express = require('express'),
       app = express(),
   bodyParser = require('body-parser'),
     passport = require('passport'),
      // session = require('express-session'),
LocalStrategy = require('passport-local').Strategy;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4321, () => {
  console.log('Server is listening on port 4321');
});