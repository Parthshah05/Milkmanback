module.exports =  (sequelize, DataTypes) => {
  const Product = sequelize.define('product_master', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      },
      unique: {
        args: true,
        msg: 'Product Already Exists'
      }
    },
    
    description: {
      type: DataTypes.STRING,
     
    },
    image: {
      type: DataTypes.STRING,
      
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter your price'
      },
    }
  }, {freezeTableName: true});
  Product.associate = (models) => {
    // associations can be defined here
    Product.hasMany(models.tbl_bundle_product, {
      foreignKey: 'id',
    });
  };
  return Product;
};