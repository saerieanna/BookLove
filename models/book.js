module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
    {
    classMethods: {
      // Associating Book with Discussion
      // When a Book is deleted, also delete any associated Discussions, Chapters
      associate: function(models) {
        Book.hasMany(models.Discussion, {
          onDelete: "cascade"
        },
        models.Chapter, {
          onDelete: "cascade"
        },
        // If a book is deleted, the Member should NOT be deleted
        models.Member
        );
      }
    }
  });
  return Book;
};