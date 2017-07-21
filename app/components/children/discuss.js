var React = require("react");


var discuss = React.createClass({

	getInitialState: function() {
	  	return {
	  		first_name: "",
	  		last_name: "",
	  		email: "",
	  		current_book:"",
	  		chapter: "",
	  		photo_path:"",
	  	};
	},

	componentWillMount(){
		axios.get("/").then(function(res){
	    	this.setState(res);
      });
	},

	render: function() {
		return (
	  	<div className="col s8">
			<img className="enlarge" src={this.state.photo_path} />
		</div>
		)
	}
});

module.exports=discuss;