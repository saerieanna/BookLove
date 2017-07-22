// If we start the table with just name, email of members, the other fiels must be allowed to be blank. We have to set in the database "created at" and "updated at" to "CURRENT_TIMESTAMP"

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    goodreads_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    favorite_book: {
      type: DataTypes.STRING,
      allowNull: true
    },
    favorite_genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    current_book: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    completed_book: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    photo_path: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
    classMethods: {
      associate: function(models) {
        Member.hasMany(models.Disussion, {
          foreignKey: "email",
          sourceKey: "email",
          onDelete: "cascade"
        });
        Member.hasMany(models.Book, {
          foreignKey:"id",
          sourceKey:"current_book",
          onDelete:"cascade"
        });
        Member.hasMany(models.Chapter,{
          foreignKey:"chapter",
          sourceKey:"chapter",
          onDelete:"cascade"
        });
        Member.hasOne(models.MemberBook, {
          foreignKey: "member_id"
        });
      }
    }
   });
  return Member;
};


