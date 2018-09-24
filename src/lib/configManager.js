const path = require('path')
const fs = require('fs')

/**
 * ConfigManager
 *
 * Management utility to handle configuration
 */
module.exports = class ConfigManager {
  /**
   * Constructor
   *
   * @param {string} configPath - Path to config file
   */
  constructor (configPath) {
    this.config = configPath
  }

  /**
   * Setter for config
   *
   * @param {string} configPath - Path to config file
   */
  set config (configPath) {
    let confPath = path.join(__dirname, '../..', configPath)

    this._config = JSON.parse(fs.readFileSync(confPath, { encoding: 'utf-8' }))
  }

  /**
   * Getter for config
   *
   * @returns {object} config
   */
  get config () {
    return this._config
  }

  /**
   * Get function to get data from configuration
   *
   * @param {string} key - key to get from the config file
   *
   * @returns {variable} value
   */
  get (key) {
    return this.config[key]
  }
}
