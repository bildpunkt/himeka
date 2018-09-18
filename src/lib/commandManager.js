const path = require('path')
const fs   = require('fs')

module.exports = class CommandManager {
  constructor (config, client) {
    this.config = config
    this.client = client

    this.commands = this.collectCommands()
    this.setupCommands()
  }

  collectCommands () {
    let commands = {}
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
      const command = require(path.join(__dirname, '../commands', file))

      if (commands[command.event] == undefined) {
        commands[command.event] = {}
      }

      commands[command.event][command.name] = command
    }

    if (this.config.get('additionalCommands').enabled) {
      const additionalCommandFiles = 
        fs.readdirSync(path.join(__dirname, '../..', this.config.get('additionalCommands').path))
          .filter(file => file.endsWith('.js'))

      for (const file of additionalCommandFiles) {
        const command = require(path.join(__dirname, '../..', this.config.get('additionalCommands').path, file))
  
        if (commands[command.event] == undefined) {
          commands[command.event] = {}
        }
  
        commands[command.event][command.name] = command
      }
    }

    return commands
  }

  setupCommands () {
    const events = Object.keys(this.commands)

    this.client.on('ready', () => {})

    events.forEach((event) => {
      const commands = Object.keys(this.commands[event])

      commands.forEach((command) => {
        const cmd = this.commands[event][command]

        this.client.on(event, (...args) => cmd.execute(args, this.config))
      })
    })
  }
}