import { createInterface, Interface } from 'readline';
import path from 'path';
import fs from 'fs';
import { Socket } from 'net';
import { CLRF } from '../common';

const createRepl = (client: Socket): { readline: Interface; prompt: () => void } => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    readline.question('> ', command => {
      if (command.startsWith('STOR')) {
        const file = command.split(' ')[1];
        const dataFilePath = path.join(__dirname, '..', '..', file);

        if (!fs.existsSync(dataFilePath) || !fs.statSync(dataFilePath).isFile()) {
          console.log('File does not exist');
          prompt();
          return;
        }

        client.write(`STOR ${file} ${fs.readFileSync(dataFilePath).toString('base64')}`);
      }

      client.write(command + CLRF);
    });
  };

  prompt();

  return { readline, prompt };
};

export default createRepl;
