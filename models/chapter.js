module.exports = function(sequelize, DataTypes) {
  var Chapter = sequelize.define("Chapter", {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Sequelize version 4 does not allow for this syntax. 
      // references: {
      //   model: "books",
      //   key: "id"
      // }
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    
    {
    classMethods: {
      // Associating Chapter with Book, Discussion
      // If Chapter is deleted, Discussion should be deleted, but not Book
      associate: function(models) {
        Chapter.hasMany(models.Book, {
          foreignKey:"id",
          sourceKey:"book_id",
          onDelete: "set null",
          onUpdate: "cascade"
        });
      }
    }
  });
  return Chapter;
};