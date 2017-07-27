
var express = require("express");
var passport = require('passport');

var bcrypt = require('bcryptjs');
console.log("Routes loaded!");


var path = require("path");
var db = require("../models");
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const goodreads = require('goodreads');
var randomstring = require("randomstring");

var db = require("../models");

// DETERMINE CONNECTION
// =============================================================|
if (!process.env.PORT) {
var keys = require("../app/config/keys.js");
} else {
  console.log("Heroku connection");
  var keys = process.env
}

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: keys.user,
      pass: keys.pass
    }
});
 
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
                    res.json(data);
                  });
            };
        });
    });


  // INITIALIZE PASSPORT STRATEGY
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

  // GET DATA OF THE MEMBER WHO IS LOGGED IN
  app.get("/request",
    require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req,res){
      console.log("Print user name: " + req.user.first_name);
      res.json(req.user)
  });

  app.get("/comment",require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req,res){
      console.log("current chapter" +req.user.chapter);
      db.Discussion.findAll({
        where:{
          chapter: {
            $lte:req.user.chapter
          }
        },
        order: [['updatedAt', 'DESC']],
        limit:5,
        include:[{model:db.Member},{model:db.Book}],
      }).then(function(data){
        var comments=[];
        data=JSON.parse(JSON.stringify(data));
        console.log(data);
        for(key in data){
          comments.push({
            comment:data[key].comment,
            book:data[key].Book.title,
            chapter:data[key].chapter,
            sender:data[key].Member.first_name,
            image:data[key].Member.photo_path
          })
        }
        console.log(comments);
        res.json(comments);
      })
    });

  app.post("/api/comment",require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req,res){
      db.Discussion.create({
        chapter:req.body.chapter,
        comment:req.body.comment,
        email:req.body.email,
        BookId:req.body.BookId
      }).then(function(result){
        res.json(result);
      })
    });

  // CHECK TO SEE IF MEMBER IS READING A BOOK
  app.get("/api/members/:email", function(req, res) {
    db.Member.findOne({
        where: {
            email: req.params.email
        },
    }).then(function(result) {
        var book_associate=JSON.parse(JSON.stringify(result)).current_book
        console.log("book id" + book_associate);
        if (book_associate===0){
          res.json(false)
        }else{
          res.json(true)
        }
    });
  });

  // REQUEST A PROFILE BY MEMBER ID
  app.get("/profile/:id", 
    require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req, res) {      
      console.log("routehit", req.params.id);
      console.log("LOGGED IN", req.user);
      db.Member.findOne({
        where: {
          id: req.params.id
        },
      }).then(function(member){ 
        var profileObject = {
          favorite_book: member.dataValues.favorite_book,
        }
        console.log("profileObject: ", profileObject);
        console.log(profileObject.favorite_book);
        res.json(member);
    });
  });

  // REQUEST A PROFILE BY MEMBER ID
  app.get("/profile/:id", 
    require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req, res) {      
      console.log("routehit", req.params.id);
      console.log("LOGGED IN", req.user);
      db.Member.findOne({
        where: {
          id: req.params.id
        },
      }).then(function(member){ 
        var profileObject = {
          favorite_book: member.dataValues.favorite_book,
        }
        console.log("profileObject: ", profileObject);
        console.log(profileObject.favorite_book);
        res.json(member);
    });
  });

  // UPDATE MEMBER'S CHAPTER PROGRESS FROM PROFILE PAGE
  app.post("/api/chapter", function(req, res) {
      require('connect-ensure-login').ensureLoggedIn('/login'),
        function(req,res) {
          console.log("this is" + req.user.email);
          res.json(req.user)
        }
        db.Member.findOne({
            where:{
                email: req.user.email
            }
        }).then(function(data){
            console.log(data);
            if(data){
                var member_id = data.dataValues.id;
                db.Member.findOne({
                    where:{
                        id: member_id
                    }
                }).then(function(data){
                    console.log("CHAPTER going to db: ", req.body.chapter);
                    console.log(data);
                        db.Member.update({
                            chapter: req.body.chapter
                        }, {
                            where: {
                                id: member_id
                            }
                        }).then(function(data) {
                            res.json(data)
                  });
                });
            };
      });
  });

  // SEND MEMBER A NEW HASHED PASSWORD
  app.post('/api/send_email', function(req, res) {       
    var newPassword = randomstring.generate(8);
    console.log("Random string", newPassword);
    var email = req.body.email;
    console.log("User email", req.body.email);
    var hashedPassword;
    var salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(newPassword, salt);
    db.Member.findOne({
      where:{
          email:req.body.email
      }
    }).then(function(data){
      if(data){
        var member_id = data.dataValues.id;
        db.Member.findOne({
          where:{
            id : member_id
          }
        }).then(function(data){
          var member_id = data.dataValues.id;
          db.Member.update({
            password: hashedPassword,
              },{
              where:{
                id: member_id
              }
          }).then(function(data){
            var mailOptions = {
              to: email,
                subject: "Your Book Love Password Request",
                  text: "Here is your new Book Love password: " + newPassword,
                  html: "<body style='background-color: #e57373; text-align: center; padding-bottom: 15px; padding-top: 15px; font-family: Georgia; font-style: normal; font-size: 1.6rem;'><p style='color: #fffbe4; font-style: italic; font-size: 2.6rem;'>Book Love!</p><p style='color: #fffbe4;'>Here is your new Book Love password: </p><b>" + newPassword + "</b></p><p><a href='https://warm-sea-55516.herokuapp.com/' target='blank' style='color: #00CB88; font-size: 1.3rem; font-style: italic;'>Log in to Book Love</p></body>"
            }
            smtpTransport.sendMail(mailOptions, function(error, response){
              if (error){
                console.log(error);
                res.send("error");
              } else {
                console.log("Message sent to: " + req.body.email);
                var sendObject = {status: "sent", password: newPassword};
                res.send(sendObject);
              }
            });
          })
        })
      } else {
    res.send("invalid user")
      };
    });
  });

  // GET USER SHELF FROM GOODREADS USING NPM PACKAGE
  app.get("/shelf", function(req, res) {
    let key = keys.grkey
    let secret = keys.grsecret

    let sample_user = 11152546;
    console.log("this is the selected user's shelf!");
    let dump = json => {
    

    //looping through the books with .map in child vote//
    const books = json.GoodreadsResponse.books[0].book;
          
    res.json(JSON.stringify(books));

    };

    gr = goodreads.client({ 'key': key, 'secret': secret });
        let shelfOptions = { 'userID': sample_user, 'shelf': 'to-read' }

        let getShelf = gr.getSingleShelf(shelfOptions, dump);
        return getShelf;

    });

  //POST WINNING BOOK TO DATABASE//
  app.post("/api/book_winner", function(req, res) {
    var title = req.body.book;
    console.log(title)
      db.Member.findAll({
        where: {
          current_book:{
            $ne:0
          }
        }
      }).then(function(data){
        if(!data){
          db.Book.create({
          title:title,
          chapters:10
        }).then(function(data){
        res.json(data);
        })
      }else{
        res.json(false);
      }
  });
      

  app.post("/api/updateCurrentbook",function(req,res){
    var id=req.body.id;
    console.log("id is" + id);
    db.Member.update({
      current_book:id
    },{ 
      where:{
      current_book:0
      }
    }).then(function(data){
      res.json(data);
    })
  });
  //   db.Book.create({
  //           where:{
  //               title: req.body.title
  //           }
  // }).then(function(data){
  //           if(data){
  //               var book_id = data.dataValues.id;
  //               db.Book.findOne({
  //                   where:{
  //                       id : book_id
  //                   }
  //               }).then(function(data){
  //                   console.log("BOOK going to db: ", req.body.title);
  //                   console.log(data);
  //                       db.Book.update({
  //                           Title: req.body.title
  //                       }, {
  //                           where: {
  //                               id: book_id
  //                           }
  //                       }).then(function() {
  //                           res.send(true);

  //                   });
  //               });
  //           };
  //     });
  });

  app.get("/book",
    require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req,res){
      db.Book.findOne({
        where:{
          id: req.user.current_book
          }
      }).then(function(data){
        res.json(data);
    });
  });  

  // Send whole team a text message when a user finishes book.
  app.get("/phone",
    require('connect-ensure-login').ensureLoggedIn('/login'),
    function(req,res){
    var email = req.user.email;
    var user = req.user.first_name;
      db.Book.findOne({
        attributes: ['title'],
          where: {
            id: req.user.current_book
        }
      }).then(function(data) {
        var book = data.dataValues.title;
        console.log("BOOK ", book);
        db.Member.findAll({
          attributes: ['phone']
      }).then(function(data){
        db.Member.update({
          current_book: 0,
          chapter: 0
        }, {
          where: {
            id: req.user.id
          }
        }).then(function(data) {
        // Calling Nexmo for SMS
        // Need to handle throttling error in future build
        const Nexmo = require('nexmo');
        const nexmo = new Nexmo({
          apiKey: keys.apiKey,
          apiSecret: keys.apiSecret
      });
      
      nexmo.message.sendSms(
          12013517019, '15172315669', user +' finished ' +book ,
          (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      });

      nexmo.message.sendSms(
          12013517019, '13125604191', user +' finished ' +book ,
          (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });

      nexmo.message.sendSms(
          12013517019, '13126468613', user +' finished ' +book ,
          (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });
        res.json(data);
    });
   });
  });
});

};