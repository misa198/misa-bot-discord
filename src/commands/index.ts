import { Client } from 'discord.js';
import { deploy } from './utils/deploy';
import { play } from './utils/play';
import { skip } from './utils/skip';

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
    }
  });
};
