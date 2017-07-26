module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Book.associate = function (models)
  {
    Book.belongsTo(models.Member,{
      foreignKey:"current_book",
      targetKey:"id",
    });
  }
  
  return Book;
};

