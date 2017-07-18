var React = require("react");


var login = React.createClass({
	getInitialState: function() {
	  	return {
	  		email: "",
	  		password: "",
	  	};
	  },

  // Whenever we detect any change in the input, we register it
  	handleChange: function(event) {
  		console.log("INPUT CHANGED");

	  // Create syntax to capture any change in the input fields
		var newState = {};
	 	newState[event.target.id] = event.target.value;
	  	this.setState(newState);
	  	},

	  // Handle the submit button, send the terms to the parent Main component
	handleSubmit: function(event) {
	  	event.preventDefault();
	  	console.log("CLICKED");
	  	},

	render: function() {
		return (
	  	<div className="login">
			<form className="col s12">
				<div className="form-container">
					<h3 className="red-text text-light-5">Welcome back</h3>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="email" className="validate" />
							<label for="email">Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" type="password" className="validate" />
							<label for="password">Password</label>
						</div>
					</div>
					<br />
					<center>
						<button className="btn red lighten-2" type="submit" name="action">Connect</button>
						<br />
						<br />
						<a href="">Forgotten password?</a>
					</center>
				</div>
			</form>
		</div>
		)
	}
});

module.exports=login;