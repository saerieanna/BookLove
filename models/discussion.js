module.exports = function(sequelize, DataTypes) {
  var Discussion = sequelize.define("Discussion", {

    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Discussion.associate = function (models) {
    Discussion.belongsTo(models.Member,{
      foreignKey:"email",
      targetKey:"email",
      onDelete:"cascade"
    });
    Discussion.belongsTo(models.Book,{
      targetKey:"id",
      onDelete:"set null",
      onUpdate:"cascade"
    });
    Discussion.belongsTo(models.Chapter),{
      targetKey:"chapter",
      foreignKey:"chapter",
      onDelete:"cascade"
    }
  }
  return Discussion;
};
