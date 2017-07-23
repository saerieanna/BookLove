// Inclue the React library
var React = require("react");

// Include the react-router module
var router = require("react-router");

// Include the Route component
var Route = router.Route;

//  Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Include the Router component
var Router = router.Router;

// Include the browserHistory prop to configure client side routing
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory
var browserHistory = router.browserHistory;

// Reference the high-level components
var Main = require("../components/Main");
var login=require("../components/children/login");
var register=require("../components/children/register");
var vote = require("../components/children/vote");
var background=require("../components/children/background");
var profile=require("../components/children/profile");
var discuss=require("../components/children/discuss");
var modal=require("../components/children/modal")
	

// Export the Routes
module.exports = (
  // High level component is the Router component.
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
		<Route path="/register" component={register} />
		<Route path="/login" component={login} />
		<Route path="/vote" component={vote} />
		<Route path="/profile" component={profile} />
		<Route path="/discuss" component={discuss} />
		<IndexRoute component={background} />
   </Route>
  </Router>
);

