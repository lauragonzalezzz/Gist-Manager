'use strict'

var gists = [
  {id: 1, description: "description here!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
  {id: 2, description: "second gist!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
  {id: 3, description: "third!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"},
  {id: 4, description: "last gist!", url: "www.1234.com", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae nihil, assumenda expedita. Quod excepturi itaque numquam nesciunt, deleniti tempore. Eaque est, soluta iusto dolor doloribus alias labore reprehenderit velit odit?"}
]

const GistList = React.createClass({

  render: function(){
    var gistListNode = gists.map(function(gistData) {
      return (
        <Gist
          key={gistData.id}
          url={gistData.url}
          desc={gistData.description}
          content={gistData.content}>
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
  <GistList gists={gists}/>,
  document.getElementById('content')
);