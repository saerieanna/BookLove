var React = require("react");

var vote = React.createClass({

 render: function() {

     return (
          <div className="shelf">
            <h3 className="red-text text-light-5">Select a book to read!</h3>
                <div className="row">
                </div>
                <div className="row">
                </div>
                <h3 className="red-text text-light-5">Your vote: </h3> 
            <br />
        </div>
        )
    }
});

module.exports=vote;