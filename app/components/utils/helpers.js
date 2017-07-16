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

  getNewMember: function() {
    return axios.get("/api/new_member")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  postNewMember: function(first_name, last_name, email, password, phone, favorite_book) {
    var newMember = { first_name: first_name, last_name: last_name, email: email, password: password, phone: phone, favorite_book: favorite_book};
    return axios.post("/api/new_member", newMember)
      .then(function(response) {
        console.log(response);
      });
  },

  // I don't think we need this because we are not creating new member; we just need to let Passport check the email user inputs against the Member table password
  // postPassword: function(email, password) {
  //   var newMember = { email: email, password: password};
  //   return axios.post("/api/password", newMember)
  //     .then(function(response) {
  //       console.log(response);
  //     });
  // },

};

module.exports = helper;

