var session = require("express-session");

// Configure express-session
var sess = {
    secret: "wamabamadingdong",
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if (app.get("env") === "production") {
    sess.cookie.secure = true;
};

app.use(session(sess));