
var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Image, List, Card, Feed, Progress } from 'semantic-ui-react';


var profile = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
  	return {
      first_name: "",
      last_name: "",
  		photo_path: "",
      email: "",
      favorite_book: "",
      goodreads_url: ""
  	};
  },

  componentWillMount() {
    axios.get("/request".then(function(response) {
    console.log("axios results", response);
    var data = response.data;
    this.setState({ 
      photo_path: data.photo_path,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      favorite_book: data.favorite_book,
      goodreads_url: data.goodreads_url
      });
    }.bind(this));
  },

  // ADD: input field for viewing another profile

  // Handle change when user inputs name, call another function to set state

  render: function() {
  	return(
  		<div className="container teal lighten-2">
  			<Image src={this.state.photo_path} size='small' shape='circular' centered />
          	<Progress value='3' total='5' progress='ratio' indicating />
  			<List animated>
          <List.Item icon='marker' content={this.state.first_name + " " + this.state.last_name} />
  				<List.Item icon='book' content='I am reading [book_title]' />
    			<List.Item icon='marker' content='Chicago, IL' />
    			<List.Item icon='mail' content={this.state.email}/>
    			<List.Item icon='heart' content={'My favorite book: ' +this.state.favorite_book} />
    			<List.Item icon='linkify' content={this.state.goodreads_url} />
  			</List>
		</div>
		)
	}
});

module.exports=profile;

