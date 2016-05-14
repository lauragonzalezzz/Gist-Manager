/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _User = __webpack_require__(1);
	
	var Router = ReactRouter.Router,
	    Route = ReactRouter.Route,
	    Link = ReactRouter.Link,
	    browserHistory = ReactRouter.browserHistory;
	
	//AUTH TOKEN
	localStorage.gistAuthToken = window.location.hash.substring(1);
	
	ReactDOM.render(React.createElement(_User.User, null), document.getElementById('content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var User = exports.User = React.createClass({
	  displayName: "User",
	
	  getInitialState: function getInitialState() {
	    return {
	      username: "",
	      gistData: []
	    };
	  },
	  getUserInfo: function getUserInfo() {
	    $.ajax({
	      url: "https://api.github.com/user?access_token=" + token,
	      dataType: 'json',
	      cache: false,
	      success: function (data) {
	        var username = data.login;
	        // name = data.name;
	        // avatarUrl: data.avatar_url;
	        this.setState({ username: username });
	        this.getGistInfo();
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.log(xhr, status, err.toString());
	      }.bind(this)
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.getUserInfo();
	  },
	  getGistInfo: function getGistInfo() {
	    $.ajax({
	      url: "https://api.github.com/users/" + this.state.username + "/gists",
	      headers: { Authorization: "token " + token },
	      dataType: 'json',
	      cache: false,
	      success: function (gistData) {
	        this.setState({ gistData: gistData });
	      }.bind(this),
	      error: function error(xhr, status, err) {
	        console.log(xhr, status, err.toString());
	      }
	    });
	  },
	  render: function render() {
	    var self = this;
	    console.log(this.state.gistData);
	    var gistListNode = this.state.gistData.map(function (eachGistData) {
	      return React.createElement(GistList, {
	        key: eachGistData.id,
	        username: self.state.username,
	        rawURL: eachGistData.url,
	        desc: eachGistData.description });
	    });
	    return React.createElement(
	      "div",
	      { className: "userDashboard" },
	      React.createElement(
	        "h1",
	        null,
	        "Gist-Manager"
	      ),
	      gistListNode
	    );
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map