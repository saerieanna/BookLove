// NEED TO ADD: USER FEEDBACK MECHANISM ON FRONT-END. SEE {{MESSAGE}} IN PLAUDIT LANDING.HANDLEBARS. We have a "message" here but it does not have a designated spot in login.js

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    db = require('./models')

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  // Declare passport-local as the login strategy
  passport.use(new LocalStrategy(
    function(username, password, done) {
      //Finds user in db based on username (which is the email in db)
      db.Member.findOne({ 
        where: {
          email: username
        }
      }).then(function (data) {
          //Returns error if there is no user when login attempted.
          if (!data) { 
            console.log("This email is not in the system");
            return done(null, false, { message: 'This email is not in the system.' })
          }
        var user = data.dataValues;
        if(user.password) {
            var userpassword = user.password
            //Encrypts the password the user entered in login attempt, checks it against the encrypted string stored in database to see if a match.
            //Original user password is never known/shown for security.
            bcrypt.compare(password, userpassword, function(err, res) {
              if (err)
                  throw err;
              if (res){
                console.log(user.first_name + " is LOGGED IN!")
                return done(null, user)
              } else {
                return done(null, false, { message: 'Incorrect credentials. please login again.' })
              }
            })
        } else {return done(null, false, { message: "This email is not in the system." })}
     
        })
    }
  ))


//Serializes user as their UserID
  passport.serializeUser(function(user, done){
    console.log("PASSPORT SERIALIZE USER: ", user);
    done(null, user.id)
  });

 //Deserializes user on page load using their UserID to get full user info, which can be used with req.user
  passport.deserializeUser(function(id, done) {
    db.Member.findOne({
      where: {
        id: id
      }
    },{include:[{model:db.Book}]
    }).then(function (user) {
      console.log("PASSPORT USER NAME: ", user.first_name);
      if (user == null) {
        done(new Error('Wrong user id.'))
      }      
      done(null, user)
    })
  })
}
