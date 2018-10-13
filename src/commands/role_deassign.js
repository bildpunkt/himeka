import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleDeassignCommand extends MessageCommand {
  constructor(args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.commandName = 'deassign-role'
  }

  static commandName() {
    return 'deassign-role'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)

    messageArguments.shift()
    const roleName = messageArguments.join(' ')

    Role.findOne({ where: { name: roleName } })
      .then(role => {
        if (role === null) {
          this.message.channel.send('Role does not exist!')
          throw new Error()
        }

        if (this.message.member.roles.find('name', role.name)) {
          let guildRole = this.message.guild.roles.find('name', role.name)

          this.message.member.removeRole(guildRole)
          this.message.channel.send(
            `Deassigned the role \`${role.name}\` from yourself!`
          )
        } else {
          this.message.channel.send('This role is not assigned to you!')
        }
      })
      .catch(Error, () => {})
  }
}
