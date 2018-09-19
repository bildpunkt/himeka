const Discord = require('discord.js')
const CommandManager = require('./lib/commandManager')
const DatabaseManager = require('./lib/databaseManager')

module.exports = class Himeka {
  constructor (config) {
    this.client = new Discord.Client()

    this.config = config

    this.database = new DatabaseManager()
    this.commands = new CommandManager(config, this.client, this.database)
  }

  run () {
    this.client.login(this.config.get('token'))
  }
}