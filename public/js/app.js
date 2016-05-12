'use strict'

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
        this.loadGistContent(data);
        this.setState({gistArr: gistContentArr})
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.publicGistUrl, status, err.toString());
      }.bind(this)
    });
  },
  loadGistContent: function(gists){
    var gistContentArr = gists.map(function(gistObjs){
      var content;
      $.ajax({
        url: gistObjs.url,
        dataType: 'json',
        cache: false,
        success: function(gistContent){
          content = gistContent;
          console.log(content);
        },
        error: function(xhr, status, err){
          console.log(err.toString());
        }
      });
      return {
        id: gistObjs.id,
        url: gistObjs.url,
        description: gistObjs.description,
        content: content
      }
    });
    return gistContentArr;
  },
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
  <GistList publicGistUrl="https://api.github.com/gists/public"/>,
  document.getElementById('content')
);