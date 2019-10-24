module.exports = function(sequelize, DataTypes) {
  var Habit = sequelize.define("Habit", {
    habitName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    perWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 2]
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
