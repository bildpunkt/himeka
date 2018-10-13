// @ts-check

import DatabaseManager from '../lib/databaseManager'
const database = new DatabaseManager()
const { Command } = database.models

/**
 * @param {string} commandName
 */
function isCommandEnabled(commandName: string) {
  return Command.findOne({ where: { name: commandName, enabled: true } }).then(
    command => {
      if (command === null) return false

      return true
    }
  )
}

export default isCommandEnabled
