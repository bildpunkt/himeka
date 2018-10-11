// @ts-check

import DatabaseManager from '../lib/databaseManager'
const database = new DatabaseManager()
const Admin = database.models.Admin

/**
 * @param {string} userID
 */
export default function isAdmin (userID) {
  return Admin.findOne({ where: { snowflake: userID } }).then(function (admin) {
    if (admin === null) return false

    return true
  })
}
