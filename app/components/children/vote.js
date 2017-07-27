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


            <div className="ui unstackable items" key={ book.title}>
                <div className="item">
                    <div className="image">
                        <a href={book.link[0]} target="_blank"> 
                    <img src= {book.image_url} />
                        </a>

                    <span></span>
                    <span></span>
                    <div className="hearts">
                            <Rating icon='heart' defaultRating={1} maxRating={5} />
                     </div>
                      <Button type="button" className="ui basic button"
                        onSubmit={this.handleSubmit} 
                        value={book.title} 
                        onClick={this.handleChange}>
                        <i className="empty heart icon"></i>Winner
                    </Button>
                    </div>
                    <div className="content">
                        <a className="header" href={book.link[0]} target="_blank"> { book.title }</a>
                        <div className="extra">
                            <p>Average rating: {book.average_rating}</p>
                        </div>
                        <div className="meta">
                            <span>Author: 
                                <a className="authorLink" href={book.authors[0].author[0].link } target="_blank"> { book.authors[0].author[0].name} </a>
                            </span>
                        </div>
                        <div className="description">
                            <p>Description: {book.description}</p>
                        </div>

                    </div>


                </div>
                 <div className="ui divider">
                 </div>

            </div>

            ) 
        })



      
             return (
                <div className="outerVote">
                <div className="register flow-text">
                    <br></br>
                    <br></br>
                        <div className="directVote" 
                             className="flow-text">
                                <h2 className="flow-text center-align instruction">Please rank each book between one and five hearts.  Love Wins. </h2>
                        </div>
                    <br></br>
                    <br></br>
                 <div className="flow-text renderApiData"> {titles} </div> 
               
                </div>
                </div>
          
            )
        

            }

    });

             
module.exports = vote;