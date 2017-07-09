module.exports = function(sequelize, DataTypes) {
  var book = sequelize.define("book", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return book;
};