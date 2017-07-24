var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

var Menu = React.createClass({

<div class="col s4">
					   	<a href="#" data-activates="slide-out" class="button-collapse show-on-large left"><i class="material-icons">menu</i></a>
					   	<ul id="slide-out" class="side-nav">
				    		<li>
				      			<div class="userView">
									<!-- Customized view for user in side nav -->
									{{#if user}}
				        				<img class="circle" src="{{user.photo_path}}">
				        				<span class="white-text name">{{user.name}}</span>
				        			{{/if}}
				      			</div>
				    		</li>
				    
				    		<li><a href="/index">Activity Feed</a></li>
				    		<li><a href="/profile/{{user.name}}">Profile</a></li>
				    		<li><a href="/givebadge">Give a Badge!</a></li>
				    		<li><a href="/faq">Frequently Asked Questions</a></li>
				    		<li><a href="/logout">Log Out</a></li>
			  			</ul>
					</div>	

module.exports=Menu;