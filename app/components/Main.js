
var React = require("react");

var Link = require("react-router").Link;

var Main = React.createClass({

  render: function() {

    return (
      <div>
        <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo center hoverable white-text">Book Love</a>
              <ul id="nav-mobile" className="right">
                <li className="tab col s4 hoverable white-text"><Link to="/register">register</Link></li>
                <li className="tab col s4 hoverable white-text"><Link to="/login">login</Link></li>
              </ul>
            </div>
        </nav>

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

module.exports = Main;