module.exports = function(sequelize, DataTypes) {
  var Chapter = sequelize.define("Chapter", {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  },
    {
    classMethods: {
      // Associating Chapter with Book, Discussion
      // If Chapter is deleted, Discussion should be deleted, but not Book
      associate: function(models) {
        Chapter.hasMany(models.Book, models.Discussion, {
          onDelete: "cascade"
        });
      }
    }
  });
  return Chapter;
};