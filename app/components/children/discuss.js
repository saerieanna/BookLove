var React = require("react");
var axios = require("axios");
var Link = require("react-router").Link;
var helpers = require("../utils/helpers");
import { Image, List, Card, Container, Divider, Feed, Progress, Button, Header, Icon, Modal } from 'semantic-ui-react';

const divStyle = {
  padding: 20,
  backgroundColor: '#80cbc4',
  // backgroundColor: '#b2dfdb',
};

var listComment=[];

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
      chapter:data.chapter
      });
  }.bind(this));

    axios.get("/comment",{chapter:this.state.chapter}).then(function(response){
      this.setState({
        comments:response
      });
      var comments=this.state.comments
      //need to be fixed!!!
      listComment=comments.map((comment)=>
        <li>{comment.sender} + ' send out comment: ' + {comment.comment} + 'about book ' + {comment.title}</li>
      );
    }.bind(this));
  },

  handleChange: function(event) {
    console.log("INPUT CHANGED");
    // Capture any change in the input fields
    var info={};
    info[event.target.id]=event.target.value;
    axios.post("comment",info).then(function(req,res){
      console.log("new comment inserted");
    })
  },

	render: function() {
		return(
  		<div style={divStyle}>
  			<Image src={this.state.photo_path} size='small' shape='circular' centered />
        <div className="col s6">
          <ul>{listComment}</ul>
        </div>
        <div className="input-field col s6">
            <input id="comment" type="text" value={this.state.title} onChange={this.handleChange} />
                <label>Comment: </label>
        </div>
		  </div>
		)
	}
});

module.exports=discuss;