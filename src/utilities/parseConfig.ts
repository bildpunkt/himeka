import { readFileSync } from 'fs'
import { HimekaConfig } from '../types'
import { pathResolve } from './pathUtils'

const parseConfig = (configPath: string) => {
  let confPath = pathResolve(configPath)

  return JSON.parse(
    readFileSync(confPath, { encoding: 'utf-8' })
  ) as HimekaConfig
}

export default parseConfig
