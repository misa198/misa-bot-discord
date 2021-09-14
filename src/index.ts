import { config } from 'dotenv';
config();

import { TOKEN } from '@/constants/config';
import { Client, Intents } from 'discord.js';
import log from 'fancy-log';
import { scdl } from '@/services/soundcloud';
import { run } from '@/commands';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on('ready', () => {
  log.info(`> Bot is on ready as ${client?.user?.tag}`);
});

(async () => {
  await client.login(TOKEN);
  await scdl.connect();
  run(client);
})();
