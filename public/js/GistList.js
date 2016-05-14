'use strict';

const GistList = React.createClass({
  render: function(){
    return (
      <div className="gistInitialData">
        <h1>{this.props.username}</h1>
        <p>{this.props.desc}</p>
        <p>{this.props.rawURL}</p>
      </div>
    )
  }
});

module.exports = GistList;