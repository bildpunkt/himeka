const path = require('path')
const fs = require('fs')

const isCommandEnabled = require('../utilities/isCommandEnabled')

/**
 * CommandManager
 *
 * Management utility to handle commands
 */
module.exports = class CommandManager {
  /**
   * Constructor
   *
   * @param {import('./configManager')} config - instance of ConfigManager
   * @param {DiscordClient} client - instance of Discord.Client
   * @param {DatabaseManager} database - instance of DatabaseManager
   *
   * @inner {object} commands - mapped event/command object
   */
  constructor (config, client, database) {
    this.config = config
    this.client = client
    this.database = database

    this.commands = this.collectCommands()
    this.setupCommands()
  }

  /**
   * Function to collect all commands from all locations
   *
   * @returns {object} mapped object of events and commands
   */
  collectCommands () {
    let commands = {}
    const commandFiles = fs
      .readdirSync(path.join(__dirname, '../commands'))
      .filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
      const command = require(path.join(__dirname, '../commands', file))

      if (commands[command.event()] === undefined) {
        commands[command.event()] = {}
      }

      commands[command.event()][command.name()] = command

      this.addCommandToDatabase(command.name())
    }

    if (this.config.get('additionalCommands').enabled) {
      const additionalCommandFiles = fs
        .readdirSync(
          path.join(
            __dirname,
            '../..',
            this.config.get('additionalCommands').path
          )
        )
        .filter(file => file.endsWith('.js'))

      for (const file of additionalCommandFiles) {
        const command = require(path.join(
          __dirname,
          '../..',
          this.config.get('additionalCommands').path,
          file
        ))

        if (commands[command.event()] === undefined) {
          commands[command.event()] = {}
        }

        commands[command.event()][command.name()] = command

        this.addCommandToDatabase(command.name())
      }
    }

    return commands
  }

  /**
   * Function to set up all command listeners for their
   * defined events
   */
  setupCommands () {
    const events = Object.keys(this.commands)

    this.client.on('ready', () => {})

    events.forEach(event => {
      const commands = Object.keys(this.commands[event])

      commands.forEach(command => {
        const Cmd = this.commands[event][command]

        this.client.on(event, (...args) => {
          isCommandEnabled(Cmd.name()).then(result => {
            if (result) {
              new Cmd(args, this.config).execute()
            }
          })
        })
      })
    })
  }

  /**
   * Adds a command to the database
   *
   * @param {string} commandName
   */
  addCommandToDatabase (commandName) {
    const Command = this.database.models.Command

    Command.findOrCreate({ where: { name: commandName } })
  }
}
