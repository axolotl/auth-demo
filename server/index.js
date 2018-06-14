const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const models = require("./models");

// initialize app
const app = express();

// setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// setup json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup passport
app.use(
  session({ secret: "auth-demo-secret", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// serve our api
require("./routes")(app, passport);

// set port
const PORT = process.env.PORT || 8000;

// load passport strategies
require("./passport/config.js")(passport, models.User);

// sync database
models.sequelize
  .sync()
  .then(() => console.log("Nice! Database looks fine"))
  .catch(err =>
    console.log(err, "Something went wrong with the Database Update!")
  );

// setup listener
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// export app
module.exports = app;
