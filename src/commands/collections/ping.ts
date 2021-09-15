import messages from '@/constants/messages';
import { Client, CommandInteraction } from 'discord.js';

export const ping = {
  name: 'ping',
  execute: async (
    client: Client,
    interaction: CommandInteraction,
  ): Promise<void> => {
    await interaction.deferReply();
    interaction.followUp(
      `${messages.ping} - Latency: ${Math.round(
        Date.now() - interaction.createdTimestamp,
      )}ms - API Latency: ${Math.round(client.ws.ping)}ms`,
    );
  },
};
