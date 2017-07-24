var React = require("react");

var axios = require("axios");

var Link = require("react-router").Link;

var vote = React.createClass({
    getInitialState: function() {
        return { shelf: [], counter: 0 };//;
         this.state = { counter: 0};
         this.increment = this.increment.bind(this);
    },


    clickLike: function(e) {
    document.getElementById('{book.title').innerHTML = 'Like';
    e.preventDefault();
},

    
     // handleOptionChange: function (changeEvent) {
                // this.setState({
                //     selectedOption: changeEvent.target.book.title
                // });
                   
            // },
    

    handleFormSubmit: function (formSubmitEvent) {
    formSubmitEvent.preventDefault();

    
  },

    loadServerData: function() {
        $.get("/shelf", function(result) {
            if (this.isMounted()) {
                var shelf = JSON.parse(result);
                console.log(shelf);
                this.setState({ shelf: shelf });
              
            }
        }.bind(this))

    },

     // increment(e) {
     //        this.setState({Counter: this.state.counter +1});

     //        },
            // this.setState((previousState) => Update(previousState, {
            //     counter:
            //     {
            //         counter: previousState.counter + 1
            //     }
            // }))
                    //     counter: prevState.counter + 1
        //     }));
        // }, 

    componentDidMount: function() {
        this.intervalID = setInterval(this.loadServerData, 3000)
      
    },

    componentWillUnmount: function() {
        clearInterval(this.intervalID)
    },

    render: function() {
        if (this.state.shelf.length === 0) {
            return null
        } else 
        
            var titles = this.state.shelf.slice(0, 5).map(book => {
                return <div key = {book.title} className = "display-linebreak"> <h4 className="purple lighten-2">Book: </h4> <img className = "display-linebreak" src= {book.image_url} />  <h5 className=" light-blue lighten-3">Title: </h5> { book.title } <h5 className="light-blue lighten-1">Author: </h5> { book.authors[0].author[0].name} <h5 className=" light-blue darken-1">Description: </h5> { book.description } <h5 className=" light-blue darken-3">Average rating: </h5> { book.average_rating } <div> {this.state.counter}</div> <button id={book.title} value={book.title} checked={this.increment} onClick={this.increment}>Like</button>
                       </div>

            });

      
             return (
            <div className="register">
                <div className="flow-text"> {titles} 
                </div> 
            </div>
          
            )
        }

    });

             
var Counter = React.createClass({
  render: function() {
    return <div>{this.props.counter}</div>;
  }
});

module.exports = vote;


//for radio buttons//
// <div className="poll"><form action="#"> <p> <input className="validate" className="with-gap" name="voting-mech" type="radio" id="test3" value={book.title} checked={this.state.selectedOption === {book.title}} onChange={this.handleOptionChange> <label htmlFor="test3">Vote</label> </p></form> </div>
// <button className= "btn btn-default" type="submit">Submit Vote</button>


//could potentially put all the likes buttons at the bottom..
// <div>
//                 <button onClick={this.state.increment}>Book 1 <div> {this.state.counter}</div></button>
//                 <button>Book 2</button>
//                 <button>Book 3</button>
//                 <button>Book 4</button>
//                 <button>Book 5</button>
//                 </div>