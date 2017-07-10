module.exports = function(sequelize, DataTypes) {
  var chapters = sequelize.define("chapters", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  });
  return chapters;
};
