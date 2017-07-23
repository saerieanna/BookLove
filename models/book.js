module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Book.associate = function (models)
  {
    Book.hasMany(models.Chapter);

    Book.hasMany(models.Member);
  }
  
  return Book;
};