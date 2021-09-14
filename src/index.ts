import 'module-alias/register';
import { config } from 'dotenv';
config();

import { Client, Intents } from 'discord.js';
import log from 'fancy-log';
import { TOKEN } from '@/constants/config';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.on('ready', () => {
  log.info(`> Bot is on ready as ${client.user.tag}`);
});

client.login(TOKEN);
