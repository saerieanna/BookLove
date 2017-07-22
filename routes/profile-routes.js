var db = require("../models");
var passport = require('passport');
var path = require("path");
var db = require("../models");
var nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
const goodreads = require('goodreads');
var randomstring = require("randomstring");

module.exports =  function(app){

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
}


// app.get('/settings',
//   ensureLoggedIn('/login'),
//   function(req, res) {
//     res.render('settings', { user: req.user });
//   });