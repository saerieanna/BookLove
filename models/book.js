module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
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
  return Book;
};