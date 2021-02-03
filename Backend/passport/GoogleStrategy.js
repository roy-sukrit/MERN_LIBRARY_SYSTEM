// const User = require('../models/user')
// const passport = require('passport')
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require('dotenv').config()



// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.Client_ID,
//         clientSecret: process.env.Client_Secret,
//         callbackURL: "http://localhost:8080/auth/google/redirect"
//       },
//       (accessToken, refreshToken, profile, done) => {
//         // passport callback function
//         //check if user already exists in our db with the given profile ID
//         User.findOne({googleId: profile.id}).then((currentUser)=>{
//           if(currentUser){
//             //if we already have a record with the given profile ID
//             done(null, currentUser);
//           } else{
//                //if not, create a new user 
//               new User({
//                 googleId: profile.id,
//               }).save().then((newUser) =>{
//                 done(null, newUser);
//               });
//            } 
//         })
//       })
//   );