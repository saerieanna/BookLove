// Borrowing from 061717 Address-Finder-Solution
var axios = require("axios");

var key = 'GEaona3XZoaopMTFSjubmw'
var secret = '12GVJb7iU0n5mAfQ0BhxE2rhfTkALakQrrg3wpyI4w'

var helper = {
  runQuery: function(title) {

    var queryURL = "https://www.goodreads.com/review/list/69348922.xml?key=" + key + "&v=2"
    console.log("queryURL: " + queryURL);
    return axios.get(queryURL).then(function(response) {

      if (response) {
        return response.data; 
      } else {
        console.log("NO RESULTS");
        return "";
        }
    });
  },
};

module.exports = helper;

