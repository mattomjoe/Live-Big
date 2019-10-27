var db = require("../models");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(newUser) {
      res.json(newUser);
    });
  });

  // Get all of a particular user's habits
  app.get("/api/users/:id", function(req, res) {
    db.User.findAll({
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
