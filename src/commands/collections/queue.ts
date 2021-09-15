import messages from '@/constants/messages';
import { servers } from '@/servers';
import { CommandInteraction, TextChannel } from 'discord.js';
import { pagination } from 'reconlx';
import { createQueueMessages } from '../messages/queueMessage';

export const queue = {
  name: 'queue',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    if (server.queue.length === 0) {
      await interaction.followUp(messages.nothing);
      return;
    }

    const embedMessages = createQueueMessages(server.queue);
    await interaction.editReply(messages.yourQueue);

    if (
      interaction &&
      interaction.channel &&
      interaction.channel instanceof TextChannel
    ) {
      await pagination({
        embeds: embedMessages,
        channel: interaction.channel as TextChannel,
        author: interaction.user,
        fastSkip: true,
      });
    }
  },
};
