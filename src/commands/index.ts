import messages from '@/constants/messages';
import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { help } from './collections/help';
import { jump } from './collections/jump';
import { leave } from './collections/leave';
import { nowPlaying } from './collections/nowplaying';
import { pause } from './collections/pause';
import { play } from './collections/play';
import { queue } from './collections/queue';
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
        case leave.name:
          leave.execute(interaction);
          break;
        case nowPlaying.name:
          nowPlaying.execute(interaction);
          break;
        case queue.name:
          queue.execute(interaction);
          break;
        case jump.name:
          jump.execute(interaction);
          break;
        case help.name:
          help.execute(interaction);
          break;
      }
    } catch (e) {
      interaction.reply(messages.error);
    }
  });
};
