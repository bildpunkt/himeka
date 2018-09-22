const isAdmin = require('../utilities/isAdmin')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Command = database.models.Command

module.exports = {
  name: 'enable',
  description: 'Enable a command to be used!',
  event: 'message',
  execute(args, config) {
    const message = args[0]

    if (!message.content.startsWith(config.get('prefix')) || message.author.bot) return false

    const cmdArgs = message.content.slice(config.get('prefix').length).split(/ +/);
    const command = cmdArgs.shift().toLowerCase();

    const cmdName = cmdArgs[0]
    
    if (command === 'enable') {
      isAdmin(message.author.id).then((result) => {
        if (result) {
          return Command
                  .findOne({ where: { name: cmdName } })
        }
      }).then((command) => {
        if (command === null) {
          message.channel.send('Command does not exist!')
          throw new Error()
        }

        if (command.enabled === true) {
          message.channel.send('Command is already enabled!')
          throw new Error()
        }

        command.updateAttributes({
          enabled: true
        }).then(() => {
          message.channel.send(`Command \`${cmdName}\` is now enabled!`)
        })
      }).catch(Error, () => {})
    }
  },
};