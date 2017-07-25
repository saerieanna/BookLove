var React = require("react");
var axios = require("axios");

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


  componentWillMount() {
    axios.get("/request").then(function(response) {
    console.log("axios results", response);
    var data = response.data;
    this.setState({ 
      photo_path: data.photo_path,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      favorite_book: data.favorite_book,
      goodreads_url: data.goodreads_url,
      });
    }.bind(this));
  },

	render: function() {
		return(
  		<div className="container teal lighten-2">
  			<Image src={this.state.photo_path} size='small' shape='circular' centered />
		</div>
		)
	}
});

module.exports=discuss;