module.exports = (sequelize, DataTypes) => {
  const Bundle = sequelize.define('bundle_master', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your Bundle'
      }
    }
    
    
  }, {freezeTableName: true});
  Bundle.associate = (models) => {
    // associations can be defined here
    Bundle.hasMany(models.tbl_bundle_product, {
      foreignKey: 'id',
    });
  };
  return Bundle;
};