const isAdmin = require('../utilities/isAdmin')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Admin = database.models.Admin

module.exports = {
  name: 'remove-admin',
  description: 'Remove an admin from the bot!',
  event: 'message',
  execute(args, config) {
    const message = args[0]

    if (!message.content.startsWith(config.get('prefix')) || message.author.bot) return false

    const cmdArgs = message.content.slice(config.get('prefix').length).split(/ +/);
    const command = cmdArgs.shift().toLowerCase();

    const userID = cmdArgs[0]
    
    if (command === 'remove-admin') {
      isAdmin(message.author.id).then((result) => {
        if (result) {
          return Admin
                  .findOne({ where: { snowflake: userID } })
        }
      }).then((admin) => {
        if (admin === null) {
          message.channel.send('User is not an admin!')
          throw new Error()
        }

        Admin.destroy({ where: { snowflake: userID } })
          .then(() => {
            message.channel.send(`Admin rights revoked for user with ID ${userID}!`)
          })
      }).catch(Error, () => {})
    }
  },
};