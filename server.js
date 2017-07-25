// =============================================================|
// Server.js - This file is the initial starting point for the Node/Express server.
// =============================================================|
var express = require("express");

// Sets up the Express App
// =============================================================|
var app = express();
var PORT = process.env.PORT || 8080;

// Dependencies
// =============================================================|
var bodyParser = require("body-parser");
var setupPassport = require('./passport.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require("connect-flash");
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Determine our connection
// =============================================================|
if (PORT === 8080) {
	var keys = require("./app/config/keys.js");
} else {
	console.log("Heroku connection");
	var keys = process.env
};

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
	  apiKey: keys.apiKey,
  	  apiSecret: keys.apiSecret
});

// TESTING NEXMO
// nexmo.message.sendSms(
//   12013517019, '13125604191', 'Hey girl!',
//     (err, responseData) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.dir(responseData);
//       }
//     }
//  );

// Setting up login session
app.use(cookieParser())
app.use(session({ secret: 'friedbanana', resave: false, saveUninitialized: false }))
app.use(flash());

// app.use(express.static(process.cwd() + "/public"));
app.use(express.static(__dirname + '/public'));
// app.use(express.static("./public"));

setupPassport(app);

// Routes
// =============================================================|
require("./routes/routes.js")(app);


// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
  console.log(__dirname);
  // app.use(express.static(process.cwd() + "/public"));
  

});


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
    });
});

