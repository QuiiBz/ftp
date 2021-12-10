import path from 'path';
import fs from 'fs';
import { rootDir } from '../../server';
import { Command } from '../command';

const retrieveCommand: Command = {
  name: 'RETR',
  description: 'Description',
  execAuth: (user, ...args) => {
    const file = args[0];
    const dataFilePath = path.join(rootDir, user.cwd, file);

    if (!fs.existsSync(dataFilePath) || !fs.statSync(dataFilePath).isFile()) {
      return '213 File does not exist';
    }

    return `150 ${file} ${fs.readFileSync(dataFilePath).toString('base64')}`;
  },
};

export default retrieveCommand;
