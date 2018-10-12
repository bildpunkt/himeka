import { join } from 'path'
import { readFileSync } from 'fs'

/**
 * ConfigManager
 *
 * Management utility to handle configuration
 */
export default class ConfigManager {
  /**
   * Constructor
   *
   * @param {string} configPath - Path to config file
   */
  constructor(configPath) {
    this.config = configPath
  }

  /**
   * Setter for config
   *
   * @param {string} configPath - Path to config file
   */
  set config(configPath) {
    let confPath = join(__dirname, '../..', configPath)

    this._config = JSON.parse(readFileSync(confPath, { encoding: 'utf-8' }))
  }

  /**
   * Getter for config
   *
   * @returns {*} config
   */
  get config() {
    return this._config
  }

  /**
   * Get function to get data from configuration
   *
   * @param {string} key - key to get from the config file
   * @returns {*} value
   */
  get(key) {
    return this.config[key]
  }
}
