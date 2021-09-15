import { CommandInteraction } from 'discord.js';
import { createHelpMessage } from '../messages/helpMessage';

export const help = {
  name: 'help',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    await interaction.followUp({
      embeds: [createHelpMessage()],
    });
  },
};
