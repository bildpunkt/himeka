// @ts-check

import { Client } from 'discord.js'
import CommandManager from './lib/commandManager'
import DatabaseManager from './lib/databaseManager'

/**
 * Himeka
 *
 * Main class for the Discord bot
 */
export default class Himeka {
  /**
   * @constructor
   * @param {*} config - instance of ConfigManager
   */
  constructor (config) {
    this.client = new Client()
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
