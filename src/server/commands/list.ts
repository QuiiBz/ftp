import fs from 'fs';
import path from 'path/posix';
import { Command } from '../command';
import { rootDir } from '../../server';

const listCommand: Command = {
  name: 'LIST',
  description: 'List files in current working directory',
  execAuth: ({ cwd }) => {
    const files = fs.readdirSync(path.join(rootDir, cwd));

    return `200 ${files.join(', ')}`;
  },
};

export default listCommand;
