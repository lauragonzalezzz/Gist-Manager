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
      username: "",
      gistData: []
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
        this.setState({gistData : gistData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }
    });
  },
  render: function(){
    var self = this;
    console.log(this.state.gistData);
    var gistListNode = this.state.gistData.map(function(eachGistData){
      return (
        <Gists
          key={eachGistData.id}
          username={self.state.username}
          rawURL={eachGistData.url}
          desc={eachGistData.description} >
        </Gists>
      )
    })
    return (
      <div className="userDashboard">
        <h1>Gist-Manager</h1>
          {gistListNode}
      </div>
    )
  }
});

//GISTS COMPONENT
const Gists = React.createClass({
  render: function(){
    return (
      <div className="gistInitialData">
        <h1>{this.props.username}</h1>
        <p>{this.props.desc}</p>
        <p>{this.props.rawURL}</p>
      </div>
    )
  }
})



ReactDOM.render(
  <User />,
  document.getElementById('content')
);
