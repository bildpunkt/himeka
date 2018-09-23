const MessageCommand = require('../lib/commands/messageCommand')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Role = database.models.Role

module.exports = class RoleAssignCommand extends MessageCommand {
  constructor (args, config) {
    super(args, config)

    this.requireCommandPrefix = true
    this.commandName = 'assign-role'
  }

  static name () {
    return 'assign-role'
  }

  command () {
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

        if (role.whitelisted === false) {
          this.message.channel.send(
            "You can't assign that role to yourself, sorry!"
          )
          throw new Error()
        }

        if (!this.message.member.roles.find('name', role.name)) {
          let guildRole = this.message.guild.roles.find('name', role.name)

          this.message.member.addRole(guildRole)
          this.message.channel.send(
            `You now have the role \`${role.name}\` assigned to yourself!`
          )
        } else {
          this.message.channel.send('This role is already assigned to you!')
        }
      })
      .catch(Error, () => {})
  }
}
