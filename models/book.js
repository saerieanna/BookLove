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
    		associate: function(models) {
    			Book.hasMany(models.Member)
    		}
        // hasMany chapter
    	}
    });
  
  return Book;
};