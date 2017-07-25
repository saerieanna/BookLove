module.exports = function(sequelize, DataTypes) {
  var Chapter = sequelize.define("Chapter", {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
      }
    });
    
    Chapter.associate = function (models) {
      Chapter.belongsTo(models.Book, {
        sourceKey:"book_id",
        onDelete: "set null",
        onUpdate: "cascade"
      });
    };
  return Chapter;
};