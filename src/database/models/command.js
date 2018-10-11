'use strict'
module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define(
    'Command',
    {
      name: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN
    },
    {}
  )
  Command.associate = function (models) {
    // associations can be defined here
  }
  return Command
}
