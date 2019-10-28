module.exports = function(sequelize, DataTypes) {
  var Habit = sequelize.define("Habit", {
    habitName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Habit.associate = function(models) {
    Habit.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Habit;
};
