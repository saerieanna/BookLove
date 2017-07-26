var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const headerStyle = {
  backgroundColor: '#80cbc4',
}

// var keys = require("../../config/keys.js");

// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//     apiKey: keys.apiKey,
//     apiSecret: keys.apiSecret
// });

// // TESTING NEXMO
// function sendTextMessage() {
// nexmo.message.sendSms(
//   12013517019, '13125604191', 'Hey girl!',
//     (err, responseData) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.dir(responseData);
//       }
//     }
//  );
// }

 // sendTextMessage: function() {
 //    alert("Sending text message!");
 //  };

function sendTextMessage() {
    alert("Hi there!");
  };

var ChapterModal = React.createClass({

  getInitialState: function() {
    return {
      chapterUpdate: "",
      // email: "",
    }
  },

  handleChange: function(event) {
    console.log("INPUT CHANGED");
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
    console.log("New chapter status: ", this.state.chapterUpdate);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED");
    helpers.postChapter(this.state.chapterUpdate)
  },

  handleClick: function(event) {
    alert("Sending text message!");
    sendTextMessage();
  },


  render: function() {
    return(
      <Modal size='small' trigger={<a className="btn btn-floating amber lighten-1 pulse"><i className="material-icons">bookmark_border</i></a>} closeIcon='close'>
        <Header style={headerStyle} icon='bookmark' content='What chapter did you just finish?' />
          <Modal.Content>
            <form onSubmit={this.handleSubmit} className="col s8">
              <center>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="chapterUpdate" type="number" value={this.state.chapterUpdate} onChange={this.handleChange} className="validate" />
                  </div>
                </div>
                <button className="btn waves-effect red lighten-2" type="submit" name="action">Submit</button>
              </center>
            </form>
          </Modal.Content>
          <Modal.Content>
            <center>
              <Header content='I just finished the book!' />
                <a onClick={this.handleClick} className="btn-floating waves-effect waves-light amber lighten-1"><i className="material-icons">comment</i></a>
            </center>
          </Modal.Content>
      </Modal>
    )
  }
});

module.exports=ChapterModal;
