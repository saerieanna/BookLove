
var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

var ChapterModal = require("./chaptermodal.js");

import { Image, List, Container, Progress, Button, Header, Icon, Modal } from 'semantic-ui-react';

// Styling our component
// ======================================|
const divStyle = {
  padding: 20,
  backgroundColor: '#80cbc4',
};

const listStyle = {
  padding: 20,
  marginTop: 20,
  backgroundColor: '#4db6ac',
};

const nameStyle = {
  paddingBottom: 10,
  paddingTop: 10,
  fontSize: 22,
  textAlign: 'center',
  color: '#ffffff',
};

var profile = React.createClass({

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

    axios.get("/book").then(function(response) {
      console.log("axios book results", response);
      var info = response.data;
      console.log("INFO", info);
      this.setState({
        chapters: info.chapters,
        book_title: info.title,
      });
    }.bind(this));
  },

  render: function() {
    return(
      <div style={divStyle}>
       <Image src={'/static'+this.state.photo_path} size='small' shape='circular' centered />
         <h2 style={nameStyle}>{this.state.first_name + " " + this.state.last_name}</h2>
          <div style={listStyle} className="container">
          
          {/* Conditional rendering based on member's association to book */}
          {this.state.current_book !=0 ? <ChapterModal /> : null}
          
          {this.state.current_book !=0 ? <Progress percent={(this.state.chapter / this.state.chapters) * 100} indicating size='medium' /> : null}
          
          <List animated>
            <List.Item icon='book' content={
              this.state.current_book != 0 ?
              ('I am reading ' +this.state.book_title) :
              ('I\'m not reading a book right now. Sad!')}/>

            <List.Item icon='bookmark' content={
              this.state.current_book != 0 && this.state.chapter !=0 ?
              ('I just finished chapter ' + " " + this.state.chapter +"!") :
              ('This is where we\'ll track my chapter progress')
            }/>
            <List.Item icon='heart' content={'My favorite book is ' +this.state.favorite_book} />
            <List.Item icon='mail' content={this.state.email}/>
            <List.Item icon='linkify' content={<a href={this.state.goodreads_url} target='_blank'>Check out my <b>Goodreads profile</b></a>}/>
          </List>
        </div>
      </div>
    )
  }
});

module.exports=profile;

