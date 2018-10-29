import ConfigManager from './lib/configManager'

export interface IAbstractCommand {
  new (args: any[], config: ConfigManager): IAbstractCommand
  commandName(): string
  commandDescription(): string
  event(): string
  execute(): void
  command(): void
}

export type HimekaConfig = {
  [key: string]: any
}

export type CommandMap = {
  [key: string]: IAbstractCommand
}

export type CommandEventMap = {
  [eventKey: string]: CommandMap
}
