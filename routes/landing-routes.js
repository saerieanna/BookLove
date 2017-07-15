// BORROWING FROM PLAUDIT LANDING-ROUTES.JS FILE NEEDS UPDATES

var path = require("path");
var db = require("../models");
var passport = require('passport');
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs')

    
module.exports = function(app) {

    app.post("/api/saved", function(req, res) {

        db.member.findOne({
            where:{
                email:req.body.email
            }
        }).then(function(data){
            if(data){
                var member_id = data.dataValues.id;
                db.employ_option.findOne({
                    where:{
                        memberId: member_id
                    }
                }).then(function(data){
                    if(!data){
                        db.member.update({
                            password: password,
                            favorite_book: req.body.favorite_book
                        }).then(function() {
                            res.send(true);
                            });
                    }else{
                        res.send("exist user");
                    }
                })
            }else{
                res.send('invalid email');
            }
        })
    });
