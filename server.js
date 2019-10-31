require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Middleware
app.use(express.urlencoded({ extended: false })); // app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
// app.use("/static", express.static("public"));
app.use(express.static(path.join(__dirname, "public/")));

// Auth middleware
app.use(
  require("express-session")({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

var appURL = "https://theymightbegiants.herokuapp.com/";

const { ExpressOIDC } = require("@okta/oidc-middleware");
const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_CLIENT_ORGURL}/oauth2/default`,
  client_id: process.env.OKTA_OAUTH2_CLIENT_ID_WEB,
  client_secret: process.env.OKTA_OAUTH2_CLIENT_SECRET_WEB,
  redirect_uri: `https://theymightbegiants.herokuapp.com/authorization-code/callback`,
  scope: "openid profile"
});

app.use(oidc.router);

// Registration page
app.use("/register", require("./routes/register"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
//require("./routes/")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/userApiRoutes.js")(app);
require("./routes/habitApiRoutes.js")(app);

var syncOptions = { force: false };

// Logout route
app.get("/logout", (req, res) => {
  if (req.userContext) {
    const idToken = req.userContext.tokens.id_token;
    const to = encodeURI(process.env.HOST_URL);
    const params = `id_token_hint=${idToken}&post_logout_redirect_uri=${to}`;
    req.logout();
    res.redirect(
      `${process.env.OKTA_CLIENT_ORGURL}/oauth2/default/v1/logout?${params}`
    );
  } else {
    res.redirect("/");
  }
});

app.use("/", require("./routes/index"));

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT
    );
  });
});

module.exports = app;
