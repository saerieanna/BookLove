// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATE

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const goodreads = require('goodreads');
var randomstring = require("randomstring");

// DETERMINE CONNECTION
// =============================================================|
if (!process.env.PORT) {
var keys = require("../app/config/keys.js");
} else {
  console.log("Heroku connection");
  var keys = process.env
}
 
module.exports = function(app) {

    // app.post('/login',
    //     passport.authenticate('local', 
    //         {failureRedirect: '/login',
    //         failureFlash: true}),
    //     function(req, res) {            
    //     });

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

        let sample_user = 4085451;
        console.log("this is the selected user's shelf!");
        let dump = json => {
            // res.json(json);

            //looping through the books with .map in child vote//
            const books = json.GoodreadsResponse.books[0].book;
          

            res.json(JSON.stringify(books));
           
            // console.log(books.map(book => {
            //     console.log('==================================');
            //     console.log("book title", book.title);
            //     console.log("book author", book.authors[0].author.name);
            //     console.log("book imageUrl", book.image_url);
            //     console.log("book description", book.description);
            //     console.log("book rating", book.average_rating);
            //     console.log('==================================');

            // }))
        };


        gr = goodreads.client({ 'key': key, 'secret': secret });
        let shelfOptions = { 'userID': sample_user, 'shelf': 'to-read' }

        let getShelf = gr.getSingleShelf(shelfOptions, dump);
        return getShelf;

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