var React = require("react");


var login = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
  	return {
  		email: "",
  		password: ""
  	};
  },

  // Whenever we detect any change in the input, we register it
  handleChange: function(event) {
  	console.log("INPUT CHANGED");

  // Capture any change in the input fields
  var newState = {};
  newState[event.target.id] = event.target.value;
  this.setState(newState);
  },

  // Handle the submit button
  handleSubmit: function(event) {
  	event.preventDefault();
  	console.log("CLICKED");
  	// I don't know if we need any helper function here. We need to let Passport handle the checking.
  	// helpers.postPassword(this.state.email, this.state.password)
  },

  render: function() {

  	return (
	  	<div className="login">
			<form onSubmit={this.handleSubmit}className="col s12">
				<div className="form-container">
					<h3 className="red-text text-light-5">Welcome back</h3>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="email" value={this.state.email} onChange={this.handleChange} className="validate" />
							<label for="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" type="password" value={this.state.password} onChange={this.handleChange} className="validate" />
							<label for="password">Password</label>
						</div>
					</div>
					<br />
					<center>
						<button className="btn red lighten-2" type="submit" name="action">Connect</button>
						<br />
						<br />
						<a href="">Forgot password?</a>
					</center>
				</div>
			</form>
		</div>
		)
	}
});

module.exports=login;