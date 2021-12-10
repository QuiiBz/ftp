import { createServer } from 'net';
import path from 'path';
import { CLRF } from './common';
import { COMMANDS } from './server/command';
import { getUser } from './server/users';

const portArgument = process.argv.slice(2)[0];
const port = portArgument ? parseInt(portArgument, 10) : 21;

export const rootDir = path.resolve(__dirname, '..', 'data');

declare module 'net' {
  interface Socket {
    id: number;
  }
}

const server = createServer(socket => {
  // Could find a way to identify the socket without this
  // eslint-disable-next-line no-param-reassign
  socket.id = Math.floor(Math.random() * 100000);
  socket.write(`220 FTP Server Ready${CLRF}`);

  process.on('SIGHUP', () => socket.end());

  socket.on('end', () => console.log('Connection end'));
  socket.on('data', buffer => {
    const [command, ...args] = buffer.toString().trim().split(' ');
    const commandHandler = COMMANDS.find(({ name }) => name === command);

    if (!commandHandler) {
      socket.write(`500 Command not found${CLRF}`);
      return;
    }

    if (commandHandler.execAuth) {
      const user = getUser(socket.id);

      if (!user || !user.isLoggedIn) {
        socket.write(`332 Need account for login ${CLRF}`);
        return;
      }

      socket.write(commandHandler.execAuth(user, ...args) + CLRF);
      return;
    }

    socket.write(commandHandler.exec!(socket.id, ...args) + CLRF);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
