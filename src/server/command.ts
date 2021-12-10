import cwdCommand from './commands/cwd';
import helpCommand from './commands/help';
import listCommand from './commands/list';
import passwordCommand from './commands/password';
import pwdCommand from './commands/pwd';
import quitCommand from './commands/quit';
import retrieveCommand from './commands/retr';
import storeCommand from './commands/stor';
import userCommand from './commands/user';
import { User } from './users';

export interface Command {
  name: string;
  description: string;
  exec?: (id: number, ...args: string[]) => string;
  execAuth?: (user: User, ...args: string[]) => string;
}

export const COMMANDS: Command[] = [
  userCommand,
  passwordCommand,
  pwdCommand,
  cwdCommand,
  listCommand,
  helpCommand,
  quitCommand,
  retrieveCommand,
  storeCommand,
];
