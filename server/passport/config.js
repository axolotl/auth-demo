const bCrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
 
module.exports = (passport, user) => {
  const User = user;
 
  passport.use('local-signup', new LocalStrategy(

    { passReqToCallback: true },

    (req, username, password, done) => {
      const generateHash = (password) => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

      User.findOne({ where: { username: username } })
        .then(user => {
          if (user) {
            return done(null, false, {
                message: 'That username is already taken'
            });
          } 

          else {
            const userPassword = generateHash(password);
            const data =
              {
                username: req.body.username,
                password: userPassword,
              };

            User.create(data).then((newUser, created) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
    }
  ));

  passport.use('local-signin', new LocalStrategy(
    { passReqToCallback: true },

    (req, username, password, done) => {
      const User = user;
      const isValidPassword = (userpass, password) => {
        return bCrypt.compareSync(password, userpass);
      }

      User.findOne({ where: { username: username } })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Username does not exist'
            });
          }

          if (!isValidPassword(user.password, password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }

          const userinfo = user.get();
          return done(null, userinfo);

        })
        .catch(err => {
          console.log("Error:", err);
          return done(null, false, {
            message: 'Something went wrong with your Signin'
          });
        });
    } 
  ));


  //serialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user 
  passport.deserializeUser((id, done)=> {
    User.findOne({ where: { id: id } }).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

};