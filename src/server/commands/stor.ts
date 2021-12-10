import path from 'path';
import fs from 'fs';
import { Command } from '../command';
import { rootDir } from '../../server';

const storeCommand: Command = {
  name: 'STOR',
  description: 'Description',
  execAuth: (user, ...args) => {
    const [file, data] = args;
    const fileContent = Buffer.from(data || '', 'base64').toString();
    const outPath = path.join(rootDir, user.cwd, file);

    fs.writeFileSync(outPath, fileContent);

    return '250 Requested file action okay, completed';
  },
};

export default storeCommand;
