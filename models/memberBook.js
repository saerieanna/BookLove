module.exports = function(sequelize, DataTypes) {
  var MemberBook = sequelize.define("MemberBook", {
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "members",
          key: "id"
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id"
      }
     }
    },
    {
      classMethods: {
        associate:function(models){
          MemberBook.belongsTo(models.Book, {
            foreignKey: "book_id",
            targetKey: "id",
            onDelete: "cascade"
          });
          MemberBook.belongsTo(models.Member,{
            foreignKey: "member_id",
            targetKey: "id",
            onDelete:"cascade"
          })
      }
  });
  return MemberBook;
};
