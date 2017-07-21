
var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Image, List, Card, Feed, Progress } from 'semantic-ui-react';


var profile = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
  	return {
  		photo_path: "",
      email: "",
      favorite_book: "",
      goodreads_url: ""
  	};
  },

  componentWillMount() {
    return axios.get("/profile").then(function(results) {
        console.log("axios results", results);
        console.log("RESULTS: ", results)
        alert("HEHEHEHEHE!!!");
        return results;
      });
  },


  // state state to response object
  // ADD: component will mount function
  // call the helper function to get data and set state
  // componentWillMount() {
  // },

  // ADD: input field for viewing another profile

  // Handle change when user inputs name, call another function to set state

  render: function() {
  	return(
  		<div className="container teal lighten-2">
  			<Image src={this.state.photo_path} size='small' shape='circular' centered />
          	<Progress value='3' total='5' progress='ratio' indicating />
  			<List animated>
  				<List.Item icon='book' content='I am reading [book_title]' />
    			<List.Item icon='marker' content='Chicago, IL' />
    			<List.Item icon='mail' content={this.state.email}/>
    			<List.Item icon='heart' content={this.state.favorite_book} />
    			<List.Item icon='linkify' content={this.state.goodreads_url} />
  			</List>
		</div>
		)
	}
});

module.exports=profile;

