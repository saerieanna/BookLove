// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATE
console.log("landing routes loaded!");

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs')

    
module.exports = function(app) {
console.log("Here!");
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
                    // // if(!data){
                        db.Member.update({})
                    //         password: req.body.password,
                    //         favorite_book: req.body.favorite_book
                    //     }).then(function() {
                    //         res.send(true);
                    //         // });
                    // // }else{
                        // res.send("exist user");
                    // }
            //     })
            // }else{
                // res.send('invalid email');
        // });
    });
};

});

});

}



