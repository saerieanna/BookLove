var React = require("react");


var login = React.createClass({

  render: function() {

  	return (
	  	<div className="login">
			<form className="col s8">
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