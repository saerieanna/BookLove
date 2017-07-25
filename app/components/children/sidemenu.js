var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

var SideMenu = React.createClass({

  render: function() {
  	return(
	  <div className="col s4">
 		<div>
			<a href="#" data-activates="slide-out" class="button-collapse show-on-large left"><i className="material-icons">menu</i></a>
			<ul id="slide-out" className="side-nav">
				 <li>
				   <div className="userView">
				        			
				    </div>
				  </li>
				    
				  <li><a href="/index">Activity Feed</a></li>
				  <li><a href="/profile/{{user.name}}">Profile</a></li>
				  <li><a href="/givebadge">Give a Badge!</a></li>
				  <li><a href="/faq">Frequently Asked Questions</a></li>
				  <li><a href="/logout">Log Out</a></li>
			</ul>	
		</div>
	  </div>
    )
  }
});

module.exports=SideMenu;