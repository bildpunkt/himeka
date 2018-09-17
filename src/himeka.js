const Discord = require('discord.js')

module.exports = class Himeka {
  constructor (config) {
    this.client = new Discord.Client()

    this.config = config
  }

  run () {
    this.client.login(this.config.get('token'))
  }
}