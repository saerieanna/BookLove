var db = require("../models");

module.exports =  function(app){

	app.get("/profile/:id", 
		require('connect-ensure-login').ensureLoggedIn(),
		function(req, res){			
		console.log("routehit", req.params.name);
		db.Member.findOne({
			where: {
				id: req.params.id
			},
		}).then(function(member){	
			var profileObject = {
				favorite_book: member.dataValues.favorite_book
			}
			console.log("profileObject: ", profileObject);
			console.log(profileObject.favorite_book);
		});
	});
}
