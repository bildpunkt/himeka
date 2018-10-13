// @ts-check

import { join } from 'path'
import { readdirSync } from 'fs'
import { Client } from 'discord.js'

import isCommandEnabled from '../utilities/isCommandEnabled'
import ConfigManager from './configManager'
import DatabaseManager from './databaseManager'
import { IAbstractCommand, CommandEventMap } from '../types'
import { pathResolve } from '../utilities/pathUtils'

/**
 * CommandManager
 *
 * Management utility to handle commands
 */
export default class CommandManager {
  private commands: Record<string, any>
  private config: ConfigManager
  private client: Client
  private database: DatabaseManager

  /**
   * Constructor
   */
  constructor(
    config: ConfigManager,
    client: Client,
    database: DatabaseManager
  ) {
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
  collectCommands() {
    let commands: CommandEventMap = {}

    const commandFiles = readdirSync(pathResolve('./src/commands')).filter(
      file => {
        return file.endsWith('.js') || file.endsWith('.ts')
      }
    )

    for (const file of commandFiles) {
      const command: IAbstractCommand = require(join(
        process.cwd(),
        './src/commands',
        file
      )).default

      if (commands[command.event()] === undefined) {
        commands[command.event()] = {}
      }

      commands[command.event()][command.commandName()] = command

      this.addCommandToDatabase(command.commandName())
    }

    if (this.config.get('additionalCommands').enabled) {
      const additionalCommandFiles = readdirSync(
        pathResolve(this.config.get('additionalCommands').path)
      ).filter(file => {
        return file.endsWith('.js') || file.endsWith('.ts')
      })

      for (const file of additionalCommandFiles) {
        const command: IAbstractCommand = require(join(
          process.cwd(),
          this.config.get('additionalCommands').path,
          file
        )).default

        if (commands[command.event()] === undefined) {
          commands[command.event()] = {}
        }

        commands[command.event()][command.commandName()] = command

        this.addCommandToDatabase(command.commandName())
      }
    }

    return commands
  }

  /**
   * Function to set up all command listeners for their
   * defined events
   */
  setupCommands() {
    const events = Object.keys(this.commands)

    this.client.on('ready', () => {})

    events.forEach(event => {
      const commands = Object.keys(this.commands[event])

      commands.forEach(command => {
        const Cmd: IAbstractCommand = this.commands[event][command]

        this.client.on(event, (...args: any[]) => {
          isCommandEnabled(Cmd.commandName()).then(result => {
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
  addCommandToDatabase(commandName: string) {
    const { Command } = this.database.models

    Command.findOrCreate({ where: { name: commandName } })
  }
}
