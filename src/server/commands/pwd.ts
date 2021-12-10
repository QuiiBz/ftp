import { Command } from '../command';

const pwdCommand: Command = {
  name: 'PWD',
  description: 'Show the current working directory',
  execAuth: ({ cwd }) => {
    return `257 ${cwd}`;
  },
};

export default pwdCommand;
