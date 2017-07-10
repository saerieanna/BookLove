module.exports = function(sequelize, DataTypes) {
  var Chapter = sequelize.define("Chapter", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id"
      }
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  return Chapter;
};