var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var {Rating, Button} =  require("semantic-ui-react");

var helpers = require("../utils/helpers");

var vote = React.createClass({
    getInitialState: function() {
        return { shelf: [],
                clickedBook: ''};
    },


    loadServerData: function() {
        $.get("/shelf", function(result) {
        var shelf = JSON.parse(result);
        this.setState({ shelf: shelf });
        }.bind(this))

    },

    componentDidMount: function() {
        this.loadServerData();
    },

    handleChange: function(event, data) {
    console.log("VALUE ================", data.value[0]);
    // this.setState({clickedBook: data.value[0] }).bind(this);
    helpers.postBookWinner(data.value[0]);
  },

    handleSubmit: function(event) {
    event.preventDefault();
    console.log("CLICKED Winner");
    
  },


    render: function() {
        if (this.state.shelf.length === 0) {
            return null
        } else 
        
        var titles = this.state.shelf.slice(0, 5).map(book => {
             return( 
                <div key = {book.title} className = "display-linebreak" className="flow-text"> 
                    <h4 className="flow-text" className="card-panel purple lighten-2"></h4> 
                        <a href={book.link[0]} target="_blank"> 
                            <img className = "display-linebreak" src= {book.image_url} />
                        </a>
                    <div>
                        <Rating icon='heart' defaultRating={1} maxRating={5} /> 
                    </div>  
                        <h5 className=" light-blue lighten-3"></h5> { book.title } 
                        <h5 className="light-blue lighten-1" >Author: </h5> { book.authors[0].author[0].name} 
                        <h5 className=" light-blue darken-3">Average rating: </h5> { book.average_rating } 
                        <h5 className=" light-blue darken-1">Description: </h5> { book.description } 
                        <Button type="button" 
                                value={book.title}
                                onClick={this.handleChange}>Winner</Button>
                </div>
                ) 
             })
      
             return (
                <div className="register flow-text">
                    <br></br>
                    <br></br>
                        <div className="directVote" 
                             className="flow-text">
                                <h2 className="flow-text">Please rank each book between one and five hearts.  Most hearts = #Winner </h2>
                        </div>
                    <br></br>
                    <br></br>
                 <div className="flow-text renderApiData"> {titles} </div> 
               
                </div>
          
            )
        

            }

    });

             
module.exports = vote;