// @ts-check

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Command = database.models.Command

/**
 * @param {string} commandName
 */
function isCommandEnabled (commandName) {
  return Command.findOne({ where: { name: commandName, enabled: true } }).then(
    command => {
      if (command === null) return false

      return true
    }
  )
}

module.exports = isCommandEnabled
