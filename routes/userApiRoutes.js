var db = require("../models");

module.exports = function(app) {
  app.get("/api/okta-sub", function(req, res) {
    console.log("User's sub is " + req.userContext.userinfo.sub);

    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        userSub: req.userContext.sub
      });
    });

    /*if (req.userContext) {
      console.log("User is" + logUserIn(req.userContext.userinfo.sub));
    };*/
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // Get data on all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(userData) {
      res.json(userData);
    });
  });

  // Get a user's data along with all
  // of their associated habits
  app.get("/api/users/:id", function(req, res) {
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
  });
};
