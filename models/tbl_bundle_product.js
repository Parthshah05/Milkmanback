module.exports =  (sequelize, DataTypes) => {
const Bundle_product = sequelize.define('tbl_bundle_product', {
    
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter your product'
      },
    },
    
    bundle_id: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter your bundle'
      },
    }
    
    
  }, {freezeTableName: true});
  Bundle_product.associate = (models) => {
    // associations can be defined here
    Bundle_product.belongsTo(models.product_master, {
      foreignKey: 'product_id',
    });

    Bundle_product.belongsTo(models.bundle_master, {
      foreignKey: 'bundle_id',
    });
  };
  return Bundle_product;
};