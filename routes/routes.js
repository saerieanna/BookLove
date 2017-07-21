// TEST FILE TO START QUERYING DATA

console.log("Routes loaded!");

var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req,res){
    var info={
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      current_book: user.current_book
      chapter: user.chapter,
      photo_path:user.photo_path
    };
    res.json(info)
  });

  app.get("/api/members", function(req, res) {
    db.Member.findAll({}).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.get("/api/members/:email", function(req, res) {
    db.Member.findOne({
        where: {
            email: req.params.email
        },
    }).then(function(result) {
        var book_associate=JSON.parse(JSON.stringify(result)).current_book
        if (book_associate===0){
          res.json(false)
        }else{
          res.json(true)
        }
    });
  });

  // BUT /api/members/book is returning "null" -- not sure why
  app.get("/api/book", function(req, res) {
    db.Book.findAll({
      attributes: ['title']
    }).then(function(dbBook) {
        res.json(dbBook);
    });
  });

  app.get("/api/book/chapters", function(req, res) {
    db.Chapter.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

  app.get("/api/book/discussion", function(req, res) {
    db.Discussion.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

  app.get("/api/book/discussion/comments", function(req, res) {
    db.Discussion.findAll({
        attributes: ['comment', 'member_name', 'chapter']
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  // BUT api/members/join is returning "null" -- not sure why
  app.get("/api/join", function(req, res) {
    db.MemberBook.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

};