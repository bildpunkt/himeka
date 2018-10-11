// @ts-check

const Discord = require('discord.js')
const CommandManager = require('./lib/commandManager')
const DatabaseManager = require('./lib/databaseManager')

/** @typedef {import('./lib/configManager')} ConfigManager */

/**
 * Himeka
 *
 * Main class for the Discord bot
 */
module.exports = class Himeka {
  /**
   * @constructor
   * @param {ConfigManager} config - instance of ConfigManager
   */
  constructor (config) {
    this.client = new Discord.Client()
    this.config = config

    this.database = new DatabaseManager()
    this.commands = new CommandManager(config, this.client, this.database)
  }

  /**
   * Function to start the bot!
   */
  run () {
    this.client.login(this.config.get('token'))
  }
}
