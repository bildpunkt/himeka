import { HimekaConfig } from '../types'
import parseConfig from '../utilities/parseConfig'

/**
 * ConfigManager
 *
 * Management utility to handle configuration
 */
export default class ConfigManager {
  config: HimekaConfig

  /**
   * Constructor
   *
   * @param {string} configPath - Path to config file
   */
  constructor(configPath: string) {
    this.config = parseConfig(configPath)
  }

  /**
   * Get function to get data from configuration
   *
   * @param {string} key - key to get from the config file
   * @returns {*} value
   */
  get(key: string) {
    return this.config[key]
  }
}
