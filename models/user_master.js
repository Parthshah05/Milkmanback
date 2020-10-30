module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user_master', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
    role_id:{
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'role_master',
      //   key: 'id',
      //   as: 'role_id',
      // }
    },
    token:{
      type: DataTypes.STRING,
    },
  }, {freezeTableName: true});
  User.associate = (models) => {
    // associations can be defined here
    User.belongsTo(models.role_master, {
      foreignKey: 'role_id',
      as:'role',
    });
  };
  return User;
};