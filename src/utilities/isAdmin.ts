// @ts-check

import DatabaseManager from '../lib/databaseManager'
const database = new DatabaseManager()
const { Admin } = database.models

/**
 * @param {string} userID
 */
export default function isAdmin(userID: string) {
  return Admin.findOne({ where: { snowflake: userID } }).then(admin => {
    if (admin === null) return false

    return true
  })
}
