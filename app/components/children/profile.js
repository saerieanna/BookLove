
var React = require("react");

var Link = require("react-router").Link;

var helpers = require("../utils/helpers");

import { Image, List, Card, Feed, Progress } from 'semantic-ui-react';


var profile = React.createClass({

  // Set initial variables for the component
  getInitialState: function() {
  	return {
  		first_name: "",
  	};
  },

  render: function() {
  	return(
  		<div className="container teal lighten-2">
  			<Image src='/assets/imgs/profilePhotos/RebeccaPalmore.png' size='small' shape='circular' centered />
          	<Progress value='3' total='5' progress='ratio' indicating />
  			<List animated>
  				<List.Item icon='book' content='I am reading [book_title]' />
    			<List.Item icon='marker' content='Chicago, IL' />
    			<List.Item icon='mail' content={<a href='mailto:rkpalmore@gmail.com'>rkpalmore@gmail.com</a>} />
    			<List.Item icon='heart' content='My favorite book: [favorite_book]' />
    			<List.Item icon='linkify' content={<a href='https://www.goodreads.com/user/show/69348922-rebecca'>goodreads</a>} />
  			</List>
  			<Card centered>
    			<Card.Content>
      				<Card.Header>
        				Recent Activity
      				</Card.Header>
    			</Card.Content>
    			<Card.Content>
      				<Feed>
        				<Feed.Event>
          					<Feed.Label image='/assets/images/avatar/small/jenny.jpg' />
          						<Feed.Content>
            						<Feed.Date content='1 day ago' />
            						<Feed.Summary>
              							You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            						</Feed.Summary>
          						</Feed.Content>
        				</Feed.Event>

        				<Feed.Event>
          					<Feed.Label image='/assets/images/avatar/small/molly.png' />
          						<Feed.Content>
            						<Feed.Date content='3 days ago' />
            						<Feed.Summary>
              							You added <a>Molly Malone</a> as a friend.
            						</Feed.Summary>
          						</Feed.Content>
        				</Feed.Event>

        				<Feed.Event>
          					<Feed.Label image='/assets/images/avatar/small/elliot.jpg' />
          						<Feed.Content>
            						<Feed.Date content='4 days ago' />
            						<Feed.Summary>
              							You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            						</Feed.Summary>
          						</Feed.Content>
        				</Feed.Event>
      				</Feed>
    			</Card.Content>
  			</Card>
		</div>
		)
	}
});

module.exports=profile;

