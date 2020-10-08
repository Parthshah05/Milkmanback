module.exports =  (sequelize, DataTypes) => {
  const Role = sequelize.define('role_master', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your Role'
      }
    }
    
    
  }, {freezeTableName: true});
  Role.associate = (models) => {
    // associations can be defined here
    Role.hasMany(models.user_master, {
      foreignKey: 'id',
    });
  };
  return Role;
};