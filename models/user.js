module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    }
    /* No longer needed since the game aspect of the app has proven to difficult to implement in the time allotted:

    whereGiant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 3],
      defaultValue: 0
    }
    */
  });

  User.associate = function(models) {
    User.hasMany(models.Habit, {
      onDelete: "cascade"
    });
  };

  return User;
};
