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
      // references: {
      //   model: "members",
      //   key: "name"
      // }
      // This means I can insert a comment from a user who is not named in MEMBER TABLE
      // Returns error that foreign key cannot be added
    }
  });
  return Discussion;
};