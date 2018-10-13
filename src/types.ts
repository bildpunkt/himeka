import ConfigManager from './lib/configManager'

export interface IAbstractCommand {
  new (args: any[], config: ConfigManager): IAbstractCommand
  commandName(): string
  event(): string
  execute(): void
  command(): void
}

export type CommandMap = {
  [key: string]: IAbstractCommand
}

export type CommandEventMap = {
  [eventKey: string]: CommandMap
}
