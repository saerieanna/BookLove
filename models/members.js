// If we start the table with just name, email of members, the other fiels must be allowed to be blank. We have to set in the database "created at" and "updated at" to "CURRENT_TIMESTAMP"

module.exports = function(sequelize, DataTypes) {
  var members = sequelize.define("members", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
      allowNull: false,
      defaultValue: 0
    },
    completed_book: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      }
    });
  return members;
};

