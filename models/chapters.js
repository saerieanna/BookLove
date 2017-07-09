module.exports = function(sequelize, DataTypes) {
  var chapters = sequelize.define("chapters", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    chapter_title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return chapters;
};