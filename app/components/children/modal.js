var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Image, List, Card, Container, Divider, Feed, Progress, Button, Header, Icon, Modal, Dropdown, Menu } from 'semantic-ui-react';

const options = 
  [
      { key: 1, text: 'Chapter 1', value: 1 },
      { key: 2, text: 'Chapter 2', value: 2 },
      { key: 3, text: 'Chapter 3', value: 3 },
  ]


var modal = React.createClass({

  // Whenever we detect any change in the input, we register it
  handleChange: function(event) {
    console.log("INPUT CHANGED");
    // Capture any change in the input fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // Handle the submit button
  handleClick: function(event) {
    // event.preventDefault();
    console.log("CLICKED");
    helpers.postChapter(this.state.email, this.state.chapterUpdate)
  },

  render: function() {
    return(

          <Modal trigger={<a className="btn btn-floating amber lighten-1 pulse"><i className="material-icons">bookmark_border</i></a>} closeIcon='close'>
            <Header icon='bookmark' content='What chapter did you just finish?' />
              <Modal.Content>
                <Dropdown
                  search
                  searchInput={{ type: 'number' }}
                  selection
                  options={options}
                  placeholder='Select chapter'
                  id='chapterUpdate'
                  value={this.state.chapterUpdate}
                  onChange={this.handleChange}
                />
                <button className="waves-effect waves-light btn amber lighten-1 right" onClick={this.handleClick}><i className="material-icons left">check</i>Submit</button>
              </Modal.Content>
          </Modal>
    )
  }
});

module.exports=modal;

