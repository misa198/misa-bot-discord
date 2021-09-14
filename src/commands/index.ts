import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { pause } from './collections/pause';
import { play } from './collections/play';
import { resume } from './collections/resume';
import { skip } from './collections/skip';
import { soundcloud } from './collections/soundcloud';

export const run = (client: Client): void => {
  deploy(client);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
    try {
      switch (interaction.commandName) {
        case play.name:
          play.execute(interaction);
          break;
        case skip.name:
          skip.execute(interaction);
          break;
        case soundcloud.name:
          soundcloud.execute(interaction);
          break;
        case pause.name:
          pause.execute(interaction);
          break;
        case resume.name:
          resume.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};
