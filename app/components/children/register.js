
var React = require("react");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

var register = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
  	return {
  		first_name: "",
  		last_name: "",
  		email_confirm: "",
  		password_confirm: "",
  		phone: "",
  		favorite_book: ""
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
  	helpers.postNewMember(this.state.first_name, this.state.last_name, this.state.email_confirm, this.state.password_confirm, this.state.phone, this.state.favorite_book)
  },

  render: function() {
  	return(
		<div className="register">
			<form onSubmit={this.handleSubmit} className="col s12">
				<div className="form-container">
					<h3 className="red-text text-light-5">Welcome</h3>
					<div className="row">
						<div className="input-field col s6">
							<input id="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} className="validate" />
								<label>First Name</label>
						</div>
						<div className="input-field col s6">
							<input id="last_name" type="text" value={this.state.last_name} onChange={this.handleChange} className="validate" />
								<label for="last_name">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input id="email" type="email" class="validate" />
								<label for="email">Email:</label>
						</div>
						<div className="input-field col s6">
							<input id="email_confirm" type="email" value={this.state.email_confirm} onChange={this.handleChange} className="validate" />
								<label for="email_confirm">Email Confirmation</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input id="password" type="password" className="validate" />
								<label for="password">Password</label>
						</div>
						<div className="input-field col s6">
							<input id="password_confirm" type="password" value={this.state.password_confirm} onChange={this.handleChange} className="validate" />
								<label for="password_confirm">Password Confirmation</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input id="phone" type="tel" value={this.state.phone} onChange={this.handleChange} className="validate" />
								<label for="tel">Phone</label>
						</div>
						<div className="input-field col s6">
							<input id="favorite_book" type="text" value={this.state.favorite_book} onChange={this.handleChange} className="validate" />
								<label for="favorite_book">Favorite Book</label>
						</div>
					</div>
					<center>
						<button className="btn waves-effect red lighten-2" type="submit" name="action">Submit</button>
					</center>
				</div>
			</form>
		</div>	
		)
	}
});

module.exports=register;