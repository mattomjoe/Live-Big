var db = require("../models");
var axios = require("axios");

function logUserIn(userName) {
  axios.get("/api/users").then(function(data) {
    console.log("Sub is " + userName);

    var existingUserId = NaN;

    for (var i = 0; i < data.length; i++) {
      if (userName === data[i].userName) {
        existingUserId = data[i].id;

        break;
      }
    }

    console.log(existingUserId);

    if (!isNaN(existingUserId)) {
      return existingUserId;
    } else {
      var newUser = {
        userName: userName
      };

      axios.post("/api/users", newUser).then(function(response) {
        console.log(
          "Created new user with userName value of " + userName + "."
        );

        console.log(response);
      });

      logUserIn(userName);
    }
  });
}

module.exports = function(app) {
  // Load index page
  var oktaSub = null;

  app.get("/", function(req, res) {
    console.log("AAAAA", req.userContext);
    console.log("---------Serving up root from htmlRoutes.js");
    //console.log("----------Hey is this you my dude?: ",req.userContext.userinfo);

    /*if (req.userContext) {
      oktaSub = req.userContext.userinfo.sub;
    }*/

    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples,
        userContext: req.userContext
      });
    });

    /*if (oktaSub !== null) {
      oktaSub = logUserIn(oktaSub);*/

    //if (req.userContext) {
    //console.log("User is " + oktaSub);
    //}
    //}
  });

  app.get("/habits", function(req, res) {
    db.User.findAll({}).then(function(userHabits) {
      res.render("habits", {
        userHabits: userHabits
      });
    });
  });

  app.get("/start/:id", function(req, res) {
    db.User.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: db.Habit
        }
      ]
    }).then(function(userHabits) {
      res.render("habits", {
        habits: userHabits[0].Habits
      });

      console.log(userHabits[0].Habits);
    });
  });

  app.get("/goals/:id", function(req, res) {
    db.User.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: db.Habit
        }
      ]
    }).then(function(userHabits) {
      res.render("Edith", {
        habits: userHabits[0].Habits
      });

      console.log(userHabits[0].Habits);
    });
  });

  app.get("/test/:id", function(req, res) {
    db.User.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: db.Habit
        }
      ]
    }).then(function(userHabits) {
      res.render("test", {
        habits: userHabits[0].Habits
      });

      console.log(userHabits[0].Habits);
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
