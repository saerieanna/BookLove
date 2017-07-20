// TEST FILE TO START QUERYING DATA

console.log("Routes loaded!");

var db = require("../models");

module.exports = function(app) {

  app.get("/api/members", function(req, res) {
    db.Member.findAll({}).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.get("/api/members/:email", function(req, res) {
    console.log("Backend has been called")
    db.Member.findOne({
        where: {
            email: req.params.email
        },
    }).then(function(res) {
      console.log("This is the member" + res);
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