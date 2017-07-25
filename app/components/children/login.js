var React = require("react");

var helpers = require("../utils/helpers");

var PasswordModal = require("./passwordmodal.js");

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
		// Capture any change in the input fields
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
  	},

 //  	redirectRoute : function(e){
	// 	helpers.redirect(e, this.state.email,this.props.history);
	// },

	// Add helper function here to update password if member users "forgot password" link

	render: function() {
		return (
	  	<div className="login">

			<form action="/login" method="post" className="col s12">
				<div className="form-container">
					<h3 className="red-text text-light-5">Welcome back</h3>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" name="username" type="email" value={this.state.email} onChange={this.handleChange} className="validate" />
							<label>Email</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} className="validate" />
							<label>Password</label>
						</div>
					</div>
					<br />
					<center>
						<button className="btn red lighten-2" type="submit" name="action">Connect</button>
						<br />
						<br />
							<PasswordModal />
					</center>
				</div>
			</form>
		</div>
		)
	}
});

module.exports=login;