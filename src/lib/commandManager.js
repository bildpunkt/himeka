const path = require('path')
const fs   = require('fs')

const isCommandEnabled = require('../utilities/isCommandEnabled')

module.exports = class CommandManager {
  constructor (config, client, database) {
    this.config = config
    this.client = client
    this.database = database

    this.commands = this.collectCommands()
    this.setupCommands()
  }

  collectCommands () {
    let commands = {}
    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
      const command = require(path.join(__dirname, '../commands', file))

      if (commands[command.event()] == undefined) {
        commands[command.event()] = {}
      }

      commands[command.event()][command.name()] = command

      this.addCommandToDatabase(command.name())
    }

    if (this.config.get('additionalCommands').enabled) {
      const additionalCommandFiles = 
        fs.readdirSync(path.join(__dirname, '../..', this.config.get('additionalCommands').path))
          .filter(file => file.endsWith('.js'))

      for (const file of additionalCommandFiles) {
        const command = require(path.join(__dirname, '../..', this.config.get('additionalCommands').path, file))
  
        if (commands[command.event()] == undefined) {
          commands[command.event()] = {}
        }
  
        commands[command.event()][command.name()] = command

        this.addCommandToDatabase(command.name())
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

        this.client.on(event, (...args) => {
          isCommandEnabled(cmd.name()).then((result) => {
            if (result) {
              (new cmd(args, this.config)).execute()
            }
          })
        })
      })
    })
  }

  addCommandToDatabase (commandName) {
    const Command = this.database.models.Command

    Command.findOrCreate({ where: { name: commandName }})
  }
}