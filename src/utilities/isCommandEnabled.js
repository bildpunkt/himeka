const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Command = database.models.Command

module.exports = function isCommandEnabled (commandName) {
  return Command.findOne({ where: { name: commandName, enabled: true } }).then(
    command => {
      if (command === null) return false

      return true
    }
  )
}
