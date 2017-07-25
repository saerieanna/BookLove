module.exports = function(sequelize, DataTypes) {
  var Discussion = sequelize.define("Discussion", {

    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Discussion.associate = function (models) {
    Discussion.hasMany(models.Member);
    Discussion.hasMany(models.Book);
  }
  return Discussion;
};

