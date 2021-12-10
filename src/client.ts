import { createConnection } from 'net';
import fs from 'fs';
import path from 'path';
import createRepl from './client/repl';

const args = process.argv.slice(2);
const host = args[0] || 'localhost';
const portArgument = args[1];
const port = portArgument ? parseInt(portArgument, 10) : 21;

const client = createConnection({ host, port });
const { readline, prompt } = createRepl(client);

client.on('data', data => {
  const [code, ...message] = data.toString().trim().split(' ');

  switch (code) {
    case '150': {
      const [file, messageData] = message;
      const fileContent = Buffer.from(messageData || '', 'base64').toString();
      const outPath = path.join(__dirname, '..', file);

      fs.writeFileSync(outPath, fileContent);
      break;
    }
    case '221':
      client.end();
      readline.close();
      return;
    default:
      console.log(message.join(' '));
      break;
  }

  prompt();
});

client.on('close', () => readline.close());
