import { Command } from '../command';
import { removeUser } from '../users';

const quitCommand: Command = {
  name: 'QUIT',
  description: 'Quit the server',
  exec: id => {
    removeUser(id);

    return '221 Service closing control connection';
  },
};

export default quitCommand;
