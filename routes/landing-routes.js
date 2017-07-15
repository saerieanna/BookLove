// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATE

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs')
// var config = require("./../keys.js");
    
module.exports = function(app) {

    // GET USER SHELF FROM GOODREADS USING NPM PACKAGE
    app.get("/shelf", function(req, res) {

       let key = 'o5rVqairFPY3P9AdqQZrgw'
       let secret = 'XC3z0WhDPoVTilPJja3qo5w8skObpMHWKJO8cG1e1o'
       let sample_user = 4085451;
       console.log("this is the selected user's shelf!");
       let dump = json => {
           res.json(json);
           // const title = json.GoodreadsResponse.books[0].book[0].title;
           // // const
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


    // UPDATE THE MEMBER DATABASE
    app.post("/api/saved", function(req, res) {

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
                    console.log("Made it here");
                        db.Member.update({
                            password: req.body.password,
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



