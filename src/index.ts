import { config } from 'dotenv';
config();

import { TOKEN } from '@/constants/config';
import { Client, Intents } from 'discord.js';
import log from 'fancy-log';
import run from '@/commands';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  log.info(`> Bot is on ready as ${client?.user?.tag}`);
});

(async () => {
  await client.login(TOKEN);
  run(client);
})();
