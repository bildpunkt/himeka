const isAdmin = require('../utilities/isAdmin')

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Admin = database.models.Admin

module.exports = {
  name: 'add-admin',
  description: 'Add an admin to the bot!',
  event: 'message',
  execute(args, config) {
    const message = args[0]

    if (!message.content.startsWith(config.get('prefix')) || message.author.bot) return false

    const cmdArgs = message.content.slice(config.get('prefix').length).split(/ +/);
    const command = cmdArgs.shift().toLowerCase();

    const userID = cmdArgs[0]
    
    if (command === 'add-admin') {
      isAdmin(message.author.id).then((result) => {
        if (result) {
          return Admin
                  .findOne({ where: { snowflake: userID } })
        }
      }).then((admin) => {
        if (admin !== null) {
          message.channel.send('User is already an admin!')
          throw new Error()
        }

        Admin.create({ snowflake: userID })
          .then(() => {
            message.channel.send(`User with ID ${userID} is now an admin!`)
          })
      }).catch(Error, () => {})
    }
  },
};