'use strict';

const   express = require('express'),
            app = express(),
     bodyParser = require('body-parser'),
       passport = require('passport'),
        session = require('express-session'),
 GitHubStrategy = require('passport-github2').Strategy,
         CONFIG = require('./config/config.json');

//PASSPORT
passport.serializeUser((user, done) => {
  return done(null, user);
});
passport.deserializeUser((obj, done) => {
  return done(null, obj)
});
passport.use(new GitHubStrategy({
  clientID: CONFIG.ClientId,
  clientSecret: CONFIG.ClientSecret,
  callbackURL: "http://127.0.0.1:4321/return"
},
  (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    return done(null, profile)
  }
));
app.use(passport.initialize());
app.use(passport.session());

//SERVER
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.secretSecret ||'keyboard cat',
  resave: false,
  saveUninitialized: false }));

//ROUTES

app.get('/return',
  passport.authenticate('github',
  {failureRedirect: "/return"})
  ,((req, res) => {
    // localStorage.GistAuthToken = req.user.accessToken;
    // console.log(localStorage.GistAuthToken);
    // res.send(req.user.accessToken)
    res.redirect('/#' + req.user.accessToken);
  })
);

// app.get('*', (req, res) => {
//   passport.authenticate('github', {scope : gist})
// });

app.listen(4321, () => {
  console.log('Server is listening on port 4321');
});