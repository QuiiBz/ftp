import fs from 'fs';
import path from 'path';
import { rootDir } from '../../server';
import { Command } from '../command';
import { addUser, USERS } from '../users';

const userCommand: Command = {
  name: 'USER',
  description: 'Log in as <user>',
  exec: (id, ...args) => {
    const username = args[0];

    if (!USERS[username]) {
      return '430 Bad user';
    }

    const wd = `/home/${username}`;
    const homeDir = path.join(rootDir, wd);

    if (!fs.existsSync(homeDir)) {
      fs.mkdirSync(homeDir, { recursive: true });
    }

    addUser({
      id,
      username,
      isLoggedIn: false,
      cwd: wd,
    });

    return '331 User name okay, need password';
  },
};

export default userCommand;
