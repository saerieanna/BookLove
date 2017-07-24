// Borrowing from 061717 Address-Finder-Solution
var axios = require("axios");

var helper = {
  getSaved: function() {
    return axios.get("/api/saved")
  },

  getNewMember: function() {
    return axios.get("/api/new_member")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  redirect: function(event,email,history) {
      axios.get("/api/members/"+email).then(function(res){
        if(res){
          history.push("profile");
          console.log("RES: ", res);
        }else{
          history.push("vote")
        }
      });
  },

  postNewMember: function(first_name, last_name, email, password, phone, goodreads_url, favorite_genre, favorite_book) {
    var newMember = { first_name: first_name, last_name: last_name, email: email, password: password, phone: phone, goodreads_url: goodreads_url, favorite_genre: favorite_genre, favorite_book: favorite_book};
    return axios.post("/api/new_member", newMember)
      .then(function(response) {
        console.log(response);
      });
  },

  postChapter: function(chapterUpdate, email) {
    var setChapter = { chapter: chapterUpdate, email: email};
    return axios.post("/api/chapter", setChapter)
      .then(function(response) {
        console.log("CHAPTER: ", response);
      });
  },

  postSendEmail: function(email) {
    var email = { email: email};
    return axios.post("/api/send_email", email)
      .then(function(response) {
        console.log("EMAIL: ", response);
      });
  },

  putUpdatePassword: function(email, password) {
    var passwordObject = { email: email, password: password};
    return axios.put("/api/update_password", password)
      .then(function(response) {
        console.log("PW: ", response);
      });
  },

};

module.exports = helper;
