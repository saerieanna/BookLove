module.exports = function(sequelize, DataTypes) {
  var MemberBook = sequelize.define("MemberBook", {
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
     }
    });

    MemberBook.associate = function (models) {
      MemberBook.belongsTo(models.Book, {
        foreignKey: "book_id",
        targetKey: "id",
        onDelete: "cascade"
      });
      MemberBook.belongsTo(models.Member, {
        foreignKey: "member_id",
        targetKey: "id",
        onDelete:"cascade"
      });
    };

  return MemberBook;
}

