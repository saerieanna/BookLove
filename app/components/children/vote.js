var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

// var helpers = require("../utils/helpers");

var vote = React.createClass({
    getInitialState: function() {
        return { shelf: [] };
    },

    loadServerData: function() {
        $.get("/shelf", function(result) {
            if (this.isMounted()) {
                var shelf = JSON.parse(result);
                console.log(shelf);
                this.setState({ shelf: shelf });
                // console.log("usershelf", result);
            }
        }.bind(this))

    },

    componentDidMount: function() {
        this.intervalID = setInterval(this.loadServerData, 10000)
        // var newState = {};
        // return axios.get("/shelf")
        // .then(function(results) {
        //   console.log("axios results bookshelf", results);
        //   return results;
        // });
    },

    componentWillUnmount: function() {
        clearInterval(this.intervalID)
    },

    render: function() {
        if (this.state.shelf.length === 0) {
            return null
        } else {
            var titles = this.state.shelf.map(book => {
                return <div key = { book.title } className = "display-linebreak"> <image source= {book.image_url} /> <h5 className="red-text text-light-5">Title: </h5> { book.title } <h5 className="red-text text-light-5">Author: </h5> { book.authors[0].author[0].name } { book.image_url } <h5 className="red-text text-light-5">Description: </h5> { book.description } <h5 className="red-text text-light-5">Average rating: </h5> { book.average_rating } </div>
            });
            return (
            <div className="register">
                <div className = "display-linebreak" className="flow-text"> { titles } </div>
            </div>
            )
        }

    }




});

module.exports = vote;