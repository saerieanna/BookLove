// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATE

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const goodreads = require('goodreads');
var randomstring = require("randomstring");
// DEVELOPMENT CONNECTION
// =============================================================|
var keys = require("../app/config/keys.js");
 
module.exports = function(app) {

    // MAYBE ADJUST SUCCESS REDIRECT?
    app.post('/login',
        passport.authenticate('local', 
            {failureRedirect: '/login',
            failureFlash: true}),
        function(req, res) {
            console.log("login checked")
        });

    // GET USER SHELF FROM GOODREADS USING NPM PACKAGE
    app.get("/shelf", function(req, res) {
       // DEVELOPMENT CONNECTION
       // =============================================================|
       let key = keys.grkey
       let secret = keys.grsecret

       // PRODUCTION CONNECTION
       // =============================================================|
       // let key = process.env.h_grkey
       // let secret = process.env.h_grsecret

       // Need to add in array of users?
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
       let shelfOptions = { 'userID': sample_user, 'shelf': 'web', 'page': 1, 'per_page': 10 }

       let getShelf = gr.getSingleShelf(shelfOptions, dump);
       return getShelf
   })


    // UPDATE THE MEMBER DATABASE AT REGISTRATION
    // ADD: USER FEEDBACK IF BAD EMAIL, OR EMAIL ALREADY REGISTERED
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
                db.Member.findOne({
                    where:{
                        id: member_id
                    }
                }).then(function(data){
                    console.log(data);
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
                        }).then(function() {
                            res.send(true);

                    });
                });
            };
        });
    });
};