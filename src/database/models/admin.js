'use strict'
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      snowflake: DataTypes.STRING
    },
    {}
  )
  Admin.associate = function (models) {
    // associations can be defined here
  }
  return Admin
}
