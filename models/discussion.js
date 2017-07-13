module.exports = function(sequelize, DataTypes) {
  var Discussion = sequelize.define("Discussion", {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "books",
        key: "id"
      }
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    member_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: "members",
      //   key: "name"
      // }
      // This means I can insert a comment from a user who is not named in MEMBER TABLE
      // Returns error that foreign key cannot be added
    }
  },
    {
    classMethods: {
        associate: function(models) {
          // A Member (foreignKey) and Book (foreignKey) 
          // are required or a Discussion can't take place
          Discussion.belongsTo(models.Member, {
            foreignKey: {
              allowNull: false
            }
          },
            models.Book, {
              foreignKey: {
                allowNull: false
              }
            });
         }
      }
    });
  return Discussion;
};