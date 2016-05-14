'use strict'
const    Router = ReactRouter.Router,
          Route = ReactRouter.Route,
           Link = ReactRouter.Link,
 browserHistory = ReactRouter.browserHistory;

var token = window.location.hash.substring(1);
localStorage.gistAuthToken = token;
var userID;
var userGists;

//GET GISTS
const GetUserGistUrl = React.createClass({
  getInitialState: function(){
    return {
      userObj: []
    }
  },
  getUserInfo: function(){
    $.ajax({
      url: "https://api.github.com/user?access_token=" + token,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log(data);
        userID = data.login;
        this.getUserGist(userID);
        this.setState({userGists : userGists})
      }.bind(this),
      error: function(xhr, status, err){
        console.log(xhr, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.getUserInfo();
  },
  getUserGist: function(){
    $.ajax({
      url: "https://api.github.com/users/" + userID + "/gists",
      headers: {Authorization: "token " + token},
      dataType: 'json',
      cache: false,
      success: function(gistData){
        userGists = gistData.map(function(gist){
          return {
            gistID: gist.id,
            gistURL: gist.url,
            files: gist.files,
            status: gist.public,
            description: gist.description
          }
        });
        console.log('userGists',userGists);
        var content;

      },
      error: function(xhr, status, err) {
        console.log(xhr, status, err.toString());
      }
    });
  },
  render: function(){
    return (
      <p>{this.state.userObj.gists_url}</p>
    )
  }
});

//LIST
const GistList = React.createClass({
  getInitialState: function(){
    return {
      gistArr: []
    }
  },
  loadDataFromGitHub: function(){
    $.ajax({
      url: this.props.publicGistUrl,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log(data);
        // this.loadGistContent(data);
        // this.setState({gistArr: JSON.parse(data)})
      }.bind(this)
      // error: function(xhr, status, err){
      //   console.log(xhr, status, err.toString());
      // }.bind(this)
    });
  },
  // this.props.publicGistUrl
  // loadGistContent: function(gists){
  //   var gistContentArr = gists.map(function(gistObjs){
  //     var content;
  //     $.ajax({
  //       url: gistObjs.url,
  //       dataType: 'json',
  //       cache: false,
  //       success: function(gistContent){
  //         content = gistContent;
  //         console.log(content);
  //       },
  //       error: function(xhr, status, err){
  //         console.log(err.toString());
  //       }
  //     });
  //     return {
  //       id: gistObjs.id,
  //       url: gistObjs.url,
  //       description: gistObjs.description,
  //       content: content
  //     }
  //   });
  //   return gistContentArr;
  // },
  componentDidMount: function(){
    this.loadDataFromGitHub();
  },
  render: function(){
    var gistListNode = this.state.gistArr.map(function(gistItem){
      return (
        <Gist
          key={gistItem.id}
          desc={gistItem.description}
          url={gistItem.url}
          content={gistItem.content}>
        </Gist>
      )
    })
    return (
      <div className="gistList">
        <h1>Gist Manager</h1>
        <h2>Gist List</h2>
        <p>By Laura</p>
        {gistListNode}
      </div>
    )
  }
});

//INDIVIDUAL GIST
const Gist = React.createClass({
  render: function(){
    return (
      <div className="gistItem">
        <h4>{this.props.desc}</h4>
        <p>{this.props.url}</p>
        <p>{this.props.content}</p>
      </div>
    )
  }
})

ReactDOM.render(
  // <GistList publicGistUrl="https://api.github.com/gists/public"/>,
  // document.getElementById('content')
  // (<Router history={browserHistory}>
  //   <Route path='/' component={GistList}>
  //   </Route>
  // </Router>),
  // document.getElementById('content')
  <GetUserGistUrl />,
  document.getElementById('content')
);


