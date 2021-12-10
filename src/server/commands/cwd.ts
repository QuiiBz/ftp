import path from 'path';
import { Command } from '../command';
import { updateUser } from '../users';

const cwdCommand: Command = {
  name: 'CWD',
  description: 'Change the current working directory',
  execAuth: (user, ...args) => {
    const cwd = path.join(user.cwd, args[0]);

    updateUser({
      ...user,
      cwd,
    });

    return `213 ${cwd}`;
  },
};

export default cwdCommand;
