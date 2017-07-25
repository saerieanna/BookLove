// TEST FILE TO START QUERYING DATA
var express = require("express");
var passport = require('passport');
var bcrypt = require('bcryptjs');
console.log("Routes loaded!");

var db = require("../models");

module.exports = function(app) {

      app.post("/api/new_member", function(req, res) {
        var hashedPassword;
        var salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(req.body.password, salt);
        db.Member.findOne({
            where:{
                email:req.body.email
            }
        }).then(function(data){
            console.log(data);
            if(data){
                var member_id = data.dataValues.id;
                // console.log("DATA VALUES:" + data.dataValues.id);
                // console.log("MEMBER ID: " + member_id);
                // db.Member.findOne({
                //     where:{
                //         id: member_id
                //     }
                // }).then(function(data){
                //     console.log(data);
                db.Member.update({
                    phone: req.body.phone,
                    password: hashedPassword,
                    goodreads_url: req.body.goodreads_url,
                    favorite_genre: req.body.favorite_genre,
                    favorite_book: req.body.favorite_book
                }, {
                    where: {
                        id: member_id
                    }
                }).then(function(data) {
                    res.send("this is the message");
                    console.log("it didn't redirect");
                  });
                // });
            };
        });
    });

  app.post('/login',
    passport.authenticate('local', 
        {failureRedirect: '/',
        failureFlash: true}),
    function(req, res) {
        db.Member.findOne({
        where: {
            id: req.user.id
        },
    }).then(function(result) {
        var book_associate=JSON.parse(JSON.stringify(result)).current_book
        console.log("book id" + book_associate);
        if (book_associate===0){
          res.redirect("/vote")
        }else{
          res.redirect("/profile")
        }
    });
  });

  app.get("/request",require('connect-ensure-login').ensureLoggedIn('/login'),function(req,res){
    console.log("print out this infor" + req.user.first_name);
    // var info={
    //   first_name: req.user.first_name,
    //   last_name: req.user.last_name,
    //   email: req.user.email,
    //   current_book: req.user.current_book,
    //   chapter: req.user.chapter,
    //   photo_path:req.user.photo_path
    // };
    res.json(req.user)
  });

  app.get("/api/members", function(req, res) {
    db.Member.findAll({}).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  // app.get("/api/members/:email", function(req, res) {
  //   db.Member.findOne({
  //       where: {
  //           email: req.params.email
  //       },
  //   }).then(function(result) {
  //       var book_associate=JSON.parse(JSON.stringify(result)).current_book
  //       console.log("book id" + book_associate);
  //       if (book_associate===0){
  //         res.json(false)
  //       }else{
  //         res.json(true)
  //       }
  //   });
  // });

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