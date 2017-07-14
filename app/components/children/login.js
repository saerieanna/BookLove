var React = require("react");


var login = React.createClass({

  render: function() {

  	return (
	  	<div className="col s8">
			<form className="col s8">
				<div className="form-container">
					<h3 className="teal-text">Welcome back</h3>
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
					<div className="row">
						<div className="input-field col s12">
							<input id="chapter" type="number" className="validate" />
							<label for="password">Password</label>
						</div>
					</div>
					<br />
					<center>
						<button className="btn waves-effect waves-light teal" type="submit" name="action">Connect</button>
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