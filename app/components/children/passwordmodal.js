var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const headerStyle = {
  backgroundColor: '#80cbc4',
}

var PasswordModal = React.createClass({

  getInitialState: function() {
    return {
      email: "",
    }
  },

  handleChange: function(event) {
    console.log("INPUT CHANGED");
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED");
    helpers.postSendEmail(this.state.email)
  },

  render: function() {
    return(
      <Modal size='small' trigger={<a className="btn btn-floating amber lighten-1"><i className="material-icons">help_outline</i></a>} closeIcon='close'>
          <Header style={headerStyle} icon='mail outline' content='Forgot password? Please enter your email address' />
            <Modal.Content>
              <form onSubmit={this.handleSubmit} className="col s12">
                <div className="form-container">
                  <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Your email" className="validate" />
                    </div>
                  </div>
                </div>
                <center>
                  <button className="btn waves-effect red lighten-2" type="submit">Submit</button>
                </center>
              </form>
            </Modal.Content>
      </Modal>
    )
  }
});

module.exports=PasswordModal;
