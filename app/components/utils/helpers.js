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

