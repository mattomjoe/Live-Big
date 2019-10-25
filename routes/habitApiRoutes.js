var db = require("../models");

module.exports = function(app) {
  // Get all habits
  app.get("/api/habits", function(req, res) {
    db.Habit.findAll({}).then(function(habits) {
      res.json(habits);
    });
  });

  // Add a new habit
  app.post("/api/habits", function(req, res) {
    db.Habit.create(req.body).then(function(newHabit) {
      res.json(newHabit);
    });
  });

  // Delete a habit with a particular id
  app.delete("/api/habits/:id", function(req, res) {
    db.Habit.destroy({ where: { id: req.params.id } }).then(function(
      doomedHabit
    ) {
      res.json(doomedHabit);
    });
  });
};
