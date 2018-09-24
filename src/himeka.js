const Discord = require('discord.js')
const CommandManager = require('./lib/commandManager')
const DatabaseManager = require('./lib/databaseManager')

/**
 * Himeka
 *
 * Main class for the Discord bot
 */
module.exports = class Himeka {
  /**
   * Constructor
   *
   * @param {ConfigManager} config - instance of ConfigManager
   *
   * @inner {Discord.Client} client - instance of Discord.Client
   * @inner {DatabaseManager} database - instance of DatabaseManager
   * @inner {CommandManager} config - instance of ConfigManager
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
