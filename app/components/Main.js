// Include React as a dependency
var React = require("react");

// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
var Link = require("react-router").Link;

// Create the Main component
var Main = React.createClass({

  render: function() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div>
        <nav>
            <div className="nav-wrapper">
              <a href="#" data-activates="slide-out" className="button-collapse show-on-large left"><i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right">
                <li className="tab col s4 hoverable white-text"><Link to="/register">register</Link></li>
                <li className="tab col s4 hoverable white-text"><Link to="/login">login</Link></li>
              </ul>
            </div>
        </nav>

        <div className="col s4">
          <h2 className="text-center red-text text-light-4">Book Love</h2>
        </div>

        {this.props.children}

        <footer>
          <hr />
          <p className="pull-right">
            <i className="fa fa-github" aria-hidden="true"></i>
            Awesome board to discuss books!&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </footer>
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Main;