// TEST FILE TO START QUERYING DATA

var db = require("../models");

module.exports = function(app) {

  app.get("/api/members", function(req, res) {
    db.Member.findAll({}).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.get("/api/members/:id", function(req, res) {
    db.Member.findOne({
        where: {
            id: req.params.id
        },
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  app.get("/api/members/book/discussion", function(req, res) {
    db.Discussion.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

  app.get("/api/members/book/discussion/comments", function(req, res) {
    db.Discussion.findAll({
        attributes: ['comment', 'member_name', 'chapter']
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });


  app.get("/api/members/book", function(req, res) {
    db.Book.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

  app.get("/api/members/join", function(req, res) {
    db.MemberBook.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });

  app.get("/api/members/book/chapters", function(req, res) {
    db.Chapter.findAll({}).then(function(dbMember) {
        res.json(dbMember);
    });
  });
};