'use strict'
const    Router = ReactRouter.Router,
          Route = ReactRouter.Route,
           Link = ReactRouter.Link,
 browserHistory = ReactRouter.browserHistory;

//AUTH TOKEN
var token = window.location.hash.substring(1);
localStorage.gistAuthToken = token;

//USER COMPONENT
const User = React.createClass({
  getInitialState: function(){
    return {
      username: ""
    }
  },
  getUserInfo: function(){
    $.ajax({
      url: "https://api.github.com/user?access_token=" + token,
      dataType: 'json',
      cache: false,
      success: function(data){
         var username = data.login;
          // name = data.name;
          // avatarUrl: data.avatar_url;
          // gistsUrl: data.gists_url;
        this.setState({username : username})
        this.getGistInfo();
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.getUserInfo();
  },
  getGistInfo: function(){
    $.ajax({
      url: "https://api.github.com/users/" + this.state.username + "/gists",
      headers: {Authorization: "token " + token},
      dataType: 'json',
      cache: false,
      success: function(gistData){
        var gistUrls = [];
        gistData.map(function(gist){
          return gistUrls.push(gist.url);
        });
        this.setState({gistUrls : gistUrls});
        this.getGistContent();
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }
    });
  },
  getGistContent: function(){
    console.log('this.state.gistUrls',this.state.gistUrls);
    // this.state.gistUrls.map(function(url){

    // })
  },
  render: function(){
    return (
      <div className="userDashboard">
        <h1>Gist-Manager</h1>
        <Gists name={this.state.username} />
      </div>
    )
  }
});

//GISTS COMPONENT
const Gists = React.createClass({
  render: function(){
    return (
      <div className="gistInitialData">
        <h1>{this.props.name}</h1>
      </div>
    )
  }
})



ReactDOM.render(
  <User />,
  document.getElementById('content')
);
