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
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Habit.associate = function(models) {
    postMessage.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Habit;
};
