import { Command } from '../command';
import { getUser, updateUser, USERS } from '../users';

const passwordCommand: Command = {
  name: 'PASS',
  description: 'Set password for current logged in user',
  exec: (id, ...args) => {
    const password = args[0];
    const user = getUser(id);

    if (!user || USERS[user.username] !== password) {
      return '430 Bad user';
    }

    updateUser({
      ...user,
      isLoggedIn: true,
    });

    return '230 User logged in, proceed';
  },
};

export default passwordCommand;
