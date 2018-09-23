'use strict'
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
      snowflake: DataTypes.STRING,
      whitelisted: DataTypes.BOOLEAN
    },
    {}
  )
  Role.associate = function (models) {
    // associations can be defined here
  }
  return Role
}
