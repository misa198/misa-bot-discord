import { Client } from 'discord.js';
import { deploy } from './collections/deploy';
import { play } from './collections/play';
import { skip } from './collections/skip';
import { soundcloud } from './collections/soundcloud';

export const run = (client: Client): void => {
  deploy(client);

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;
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
    }
  });
};
