'use strict'
const React = require('react'),
ReactDom = require('react-dom'),
Router = require('react-router'),
          Route = ReactRouter.Route,
           Link = ReactRouter.Link,
 browserHistory = ReactRouter.browserHistory,
           User = require('User.js'),
       GistList = require('GistList.js');


//AUTH TOKEN
var token = window.location.hash.substring(1)
localStorage.gistAuthToken = token;



ReactDOM.render(
  <User />,
  document.getElementById('content')
);