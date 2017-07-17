// Borrowing from 061717 Address-Finder-Solution
var axios = require("axios");

var helper = {

  getNewMember: function() {
    return axios.get("/api/new_member")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  postNewMember: function(first_name, last_name, email, password, phone, goodreads_url, favorite_genre, favorite_book) {
    var newMember = { first_name: first_name, last_name: last_name, email: email, password: password, phone: phone, goodreads_url: goodreads_url, favorite_genre: favorite_genre, favorite_book: favorite_book};
    return axios.post("/api/new_member", newMember)
      .then(function(response) {
        console.log(response);
      });
  },

};

module.exports = helper;

