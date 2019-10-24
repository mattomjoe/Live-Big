var db = require("../models");

module.exports = function(app) {
  // Get all habits
  app.get("/api/habits", function(req, res) {
    db.Habit.findAll({}).then(function(habits) {
      res.json(habits);
    });
  });

  // Get all of a particular user's habits
  app.get("/api/user-habits", function(req, res) {
    db.User.findAll({
      include: [
        {
          model: db.Habit
        }
      ]
    }).then(function(userHabits) {
      res.json(userHabits);
    });
  });

  // Add a new habit
  app.post("/api/habits", function(req, res) {
    db.Habit.create(req.body).then(function(newHabit) {
      res.json(newHabit);
    });
  });

  // Find a habit by id and delete it
  app.delete("/api/habits/:id", function(req, res) {
    db.Habit.destroy({ where: { id: req.params.id } }).then(function(
      doomedHabit
    ) {
      res.json(doomedHabit);
    });
  });

  //
};
