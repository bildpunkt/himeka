// @ts-check

const DatabaseManager = require('../lib/databaseManager')
const database = new DatabaseManager()
const Admin = database.models.Admin

/**
 * @param {string} userID
 */
module.exports = function isAdmin (userID) {
  return Admin.findOne({ where: { snowflake: userID } }).then(function (admin) {
    if (admin === null) return false

    return true
  })
}
