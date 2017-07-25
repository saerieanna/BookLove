// TO-DO: 
// Display book title instead of book id

var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

var ChapterModal = require("./chaptermodal.js");

import { Image, List, Card, Container, Divider, Feed, Progress, Button, Header, Icon, Modal } from 'semantic-ui-react';


const divStyle = {
  padding: 20,
  backgroundColor: '#80cbc4',
  // backgroundColor: '#b2dfdb',
};

const listStyle = {
  padding: 20,
  marginTop: 20,
  backgroundColor: '#4db6ac',
  // backgroundColor: '#80cbc4',
};


// <Progress value={this.state.chapter} total={this.state.chapters} progress='ratio' indicating />

var profile = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
    return {
      first_name: "",
      last_name: "",
      photo_path: "",
      email: "",
      favorite_book: "",
      goodreads_url: "",
      current_book: "",
      chapter: "",
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
      current_book: data.current_book,
      id: data.id,
      chapter: data.chapter,
      });
    }.bind(this));
  },

  // Want to add conditional so that if current_book is 0, a different list component will display.

 // HasBook: function() {
 //    return <List.Item icon='book' content={'I am reading ' +this.state.current_book}/>
 //  },

 // HasNoBook: function() {
 //    return <List.Item icon='book' content={'I am not reading a book. How sad!'}/>
 //  },

// <CheckBook reading={!0} />


 // CheckBook: function() {
 //    const reading = this.state.current_book;
 //    if (reading === 0) {
 //      return
 //      console.log("shslghslshsls!");
 //      // return <HasBook />;
 //    }
 //      // return <HasNoBook />;
 //      return console.log("nope");
 //    },

 // renderHasBook: function() {
 //  if (this.state.current_book === 0) {
 //    alert("HSHSHSHSHGIGHSLGHL!");
 //    console.log(this.state.current_book);
 //  }
 // },


  // need access to book title and total chapters

  render: function() {
    return(
      <div style={divStyle}>
       <Image src={'/static'+this.state.photo_path} size='small' shape='circular' centered />
        <div style={listStyle} className="container">
          <ChapterModal />
          <Progress percent={this.state.chapter / this.state.chapters * 100} indicating size='medium' />
          <List animated>
            <List.Item icon='user' content={this.state.first_name + " " + this.state.last_name} />


            <List.Item icon='book' content={'I am reading ' +this.state.current_book}/>

            <List.Item icon='book' content={'I am not reading a book. How sad!'}/>

            <List.Item icon='bookmark' content={'I just finished chapter ' + " " + this.state.chapter +"!"} />
            <List.Item icon='mail' content={<a href={this.state.email} target='_blank'><b>rkpalmore@gmail.com</b></a>}/>
            <List.Item icon='heart' content={'My favorite book is ' +this.state.favorite_book} />
            <List.Item icon='linkify' content={<a href={this.state.goodreads_url} target='_blank'><b>Goodreads Profile</b></a>}/>
          </List>
        </div>
      </div>
    )
  }
});

module.exports=profile;

