module.exports = function(sequelize, DataTypes) {
  var discussion = sequelize.define("discussion", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      }
  });
  return discussion;
};