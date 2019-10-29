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

  app.put("/api/habits/:id", function(req, res) {
    console.log("Deleting " + req.params.id);
    console.log("Setting completed to " + req.body.completed);
    db.Habit.update(
      { completed: req.body.completed },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(rowUpdated) {
      res.json(rowUpdated);
    });
  });
  /*Customer.update( { firstname: firstname, lastname: lastname, age: age }, 
    { where: {id: customerId} }
    ).then(() => {
    res.status(200).send("updated successfully a customer with id = " + id);
    });*/

  //app.put('/api/customers/:customerId', customers.update);
  // Delete a habit with a particular id
  app.delete("/api/habits/:id", function(req, res) {
    db.Habit.destroy({ where: { id: req.params.id } }).then(function(
      doomedHabit
    ) {
      res.json(doomedHabit);
    });
  });
};
