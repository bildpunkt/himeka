import * as fs from 'fs'
import { resolve } from 'path'

export const appDirectory = fs.realpathSync(process.cwd())

export const pathResolve = (relativePath: string) =>
  resolve(appDirectory, relativePath)
