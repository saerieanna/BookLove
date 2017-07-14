
var React = require("react");

var Link = require("react-router").Link;

var register = React.createClass({

  render: function() {
  	return(
		<div className="register">
			<form className="col s8">
				<div className="form-container">
					<h3 className="red-text text-light-5">Welcome</h3>
					<div className="row">
						<div className="input-field col s6">
							<input id="first_name" type="text" className="validate" />
								<label>Fist Name</label>
						</div>
						<div className="input-field col s6">
							<input id="last_name" type="text" className="validate" />
								<label for="last_name">Last Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="email" type="email" class="validate" />
								<label for="email">Email:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="email-confirm" type="email" className="validate" />
								<label for="email-confirm">Email Confirmation</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password" type="password" className="validate" />
								<label for="password">Password</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input id="password-confirm" type="password" className="validate" />
								<label for="password-confirm">Password Confirmation</label>
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