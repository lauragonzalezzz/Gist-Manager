'use strict'

// var gists = [
//   {id: 1, description: "description here!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
//   {id: 2, description: "second gist!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
//   {id: 3, description: "third!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
//   {id: 4, description: "last gist!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"}
// ]

const GistList = React.createClass({
    getInitialState: function(){
    return {
      GistArr: []
    }
  },
  loadDataFromGitHub: function(){
    $.ajax({
      url: this.props.publicGistUrl,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('data',data);





        this.setState({gistData: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.err(this.props.publicGistUrl, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadDataFromGitHub()
  },
  render: function(){
    var gistListNode = this.props.gistData.map(function(gistItem){
    console.log(gistItem);
      return (
        <RedditItem
          key={gistItem.id}
          desc={gistItem.description}
          url={gistItem.url}>
        </RedditItem>
      )
    })
    return (
      <div className="gistList">
        <h1>Gist Manager</h1>
        <h2>Gist List</h2>
        <p>By Laura</p>
        <Gist gistData={this.state.gistData} />
      </div>
    )
  }
});

const Gist = React.createClass({
  render: function(){
    return (
      <div className="gistItem">
        <h4>HELLO</h4>
      </div>
    )
  }
})


ReactDOM.render(
  <GistList publicGistUrl="https://api.github.com/gists/public"/>,
  document.getElementById('content')
);