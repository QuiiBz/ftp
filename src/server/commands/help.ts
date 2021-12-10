import { Command, COMMANDS } from '../command';

const helpCommand: Command = {
  name: 'HELP',
  description: 'Show the help',
  exec: () => {
    return COMMANDS.reduce((acc, command) => {
      return `${acc}${command.name}: ${command.description}\n`;
    }, '214 ');
  },
};

export default helpCommand;
