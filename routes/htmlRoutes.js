var db = require("../models");

function logUserIn(userName) {
  /*app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Habit
        }
      ]
    }).then(function(userHabits) {
      res.json(userHabits);
    });
  });*/

  $.get("/api/users", function(data) {
    var existingUserId = NaN;

    for (var i = 0; i < data.length; i++) {
      if (userName === data[i].userName) {
        existingUserId = data[i].id;

        break;
      }
    }

    if (!isNaN(existingUserId)) {
      return existingUserId;
    } else {
      // post route

      logUserIn(userName);
    }
  });
}

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log("AAAAA", req);
    console.log("---------Serving up root from htmlRoutes.js");
    //console.log("----------Hey is this you my dude?: ",req.userContext.userinfo);
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples,
        userContext: req.userContext
      });
    });

    //logUserIn(req.userContext.userinfo.sub);
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
