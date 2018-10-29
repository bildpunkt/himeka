import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'
import CommandManager from "../lib/commandManager";
import {RichEmbed} from "discord.js";

const database = new DatabaseManager()

export default class HelpCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = false
    this.commandName = 'help'
  }

  static commandName() {
    return 'help'
  }

  static commandDescription() {
    return 'Shows this message'
  }

  command() {
    const commandManager = new CommandManager(this.config, database)
    const commands = commandManager.collectCommands()['message']
    const message = new RichEmbed()
    message.setTitle("List of available commands")
    for (const command in commands) {
      message.addField(command, commands[command].commandDescription())
    }
    this.message.channel.send(message)
  }
}
