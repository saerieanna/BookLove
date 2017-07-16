// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATE

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const goodreads = require('goodreads');
var randomstring = require("randomstring"); 
// var config = require("./../keys.js");
    
module.exports = function(app) {

    // CHECK MEMBER EMAIL AND PASSWORD WITH THOSE FIELDS STORED IN DATABASE
    app.post('/login',
        passport.authenticate('local', 
            {failureRedirect: '/',
            failureFlash: true}),
        function(req, res) {
            console.log("We are in the app post login");
            res.redirect('/banana');
        });

    app.get("/login", function(req, res) { //catches in case passport redirects to the default /login if any session issues occur, redirects to our own login
        res.redirect('/');
    });


    // GET USER SHELF FROM GOODREADS USING NPM PACKAGE
    app.get("/shelf", function(req, res) {

       let key = 'o5rVqairFPY3P9AdqQZrgw'
       let secret = 'XC3z0WhDPoVTilPJja3qo5w8skObpMHWKJO8cG1e1o'
       let sample_user = 4085451;
       console.log("this is the selected user's shelf!");
       let dump = json => {
           res.json(json);
           // const title = json.GoodreadsResponse.books[0].book[0].title;
           // // const imageUrl = json.GoodreadsResponse.books[0].book[0].image_url;
           // // const bookImage = $("<img>");
           // // console.log('im in the dump -----', json.GoodreadsResponse.books[0].book[0]);
           // res.end()
       }

       gr = goodreads.client({ 'key': key, 'secret': secret });
       let shelfOptions = { 'userID': sample_user, 'shelf': 'web', 'page': 1, 'per_page': 100 }

       let getShelf = gr.getSingleShelf(shelfOptions, dump);
       return getShelf
   })


    // UPDATE THE MEMBER DATABASE AT REGISTRATION
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
                console.log("DATA VALUES:" + data.dataValues.id);
                console.log("MEMBER ID: " + member_id);
                db.Member.findOne({
                    where:{
                        id: member_id
                    }
                }).then(function(data){
                    console.log(data);
                        db.Member.update({
                            phone: req.body.phone,
                            password: hashedPassword,
                            favorite_book: req.body.favorite_book
                        }, {
                            where: {
                                id: member_id
                            }
                        }).then(function() {
                            res.send(true);

                    });
                });
            };
        });
    });
};



