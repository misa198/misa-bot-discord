import messages from '@/constants/messages';
import { servers } from '@/servers';
import { CommandInteraction } from 'discord.js';

export const jump = {
  name: 'jump',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    const server = servers.get(interaction.guildId as string);
    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = interaction.options.get('position')!.value! as number;
    if (input < 1 || input > server.queue.length || !Number.isInteger(input)) {
      await interaction.followUp(messages.invalidPosition);
      return;
    }
    const target = await server.jump(input);
    await interaction.followUp(`${messages.jumpedTo} ${target.song.title}`);
  },
};
