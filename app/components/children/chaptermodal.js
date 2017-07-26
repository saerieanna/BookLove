var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Image, List, Container, Progress, Button, Header, Icon, Modal } from 'semantic-ui-react';


var ChapterModal = React.createClass({

  getInitialState: function() {
    return {
      chapterUpdate: "",
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
    helpers.postChapter(this.state.chapterUpdate, this.state.email)
  },

  render: function() {
    return(

          <Modal trigger={<a className="btn btn-floating amber lighten-1 pulse"><i className="material-icons">bookmark_border</i></a>} closeIcon='close'>
            <Header icon='bookmark' content='What chapter did you just finish?' />
              <Modal.Content>
                <form onSubmit={this.handleSubmit} className="col s12">
                  <div className="form-container">
                    <div className="row">
                      <div className="input-field col s12">
                        <input id="chapterUpdate" type="number" value={this.state.chapterUpdate} onChange={this.handleChange} className="validate" />
                      </div>
                    </div>
                  </div>
                  <center>
                    <button className="btn waves-effect red lighten-2" type="submit" name="action">Submit</button>
                  </center>
                </form>
              </Modal.Content>
          </Modal>
    )
  }
});

module.exports=ChapterModal;

