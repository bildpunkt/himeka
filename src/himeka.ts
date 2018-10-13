// @ts-check

import { Client } from 'discord.js'
import CommandManager from './lib/commandManager'
import DatabaseManager from './lib/databaseManager'
import ConfigManager from './lib/configManager'

/**
 * Himeka
 *
 * Main class for the Discord bot
 */
export default class Himeka {
  client: Client
  config: ConfigManager
  database: DatabaseManager
  commands: CommandManager

  /**
   * @constructor
   */
  constructor(config: ConfigManager) {
    this.client = new Client()
    this.config = config

    this.database = new DatabaseManager()
    this.commands = new CommandManager(config, this.client, this.database)
  }

  /**
   * Function to start the bot!
   */
  run() {
    this.client.login(this.config.get('token'))
  }
}
