
var React = require("react");

var Link = require("react-router").Link;

var register = React.createClass({

  render: function() {
  	return(
		<div id="register" className="col s12 white z-depth-2">
			<form className="col s8">
				<div className="form-container">
					<h3 className="teal-text">Welcome</h3>
					<div className="row">
						<div className="input-field col s6">
							<label>
								Fist Name:
								<input id="last_name" type="text" className="validate" />
							</label>
						</div>
						<div className="input-field col s6">
							<label>
								Last Name:
								<input id="last_name" type="text" className="validate" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label for="email">
								Email:
								<input id="email" type="email" class="validate" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label for="email-confirm">
								Email Confirmation:
								<input id="email-confirm" type="email" className="validate" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label for="password">
								Password:
								<input id="password" type="password" className="validate" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label for="password-confirm">
								Password Confirmation
								<input id="password-confirm" type="password" className="validate" />
							</label>
						</div>
					</div>
					<center>
						<button className="btn waves-effect waves-light teal" type="submit" name="action">Submit</button>
					</center>
				</div>
			</form>
		</div>	
		)
	}
});

module.exports=register;