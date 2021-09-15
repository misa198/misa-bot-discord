import { schema } from '@/commands/schema';
import { MESSAGE_EMBED_COLOR } from '@/constants/config';
import messages from '@/constants/messages';
import { BaseApplicationCommandOptionsData, MessageEmbed } from 'discord.js';

export const createHelpMessage = (): MessageEmbed => {
  const embedMessage = new MessageEmbed({
    title: messages.help,
    fields: (schema as BaseApplicationCommandOptionsData[]).map(
      (item, index) => ({
        name: `${index + 1}. ${item.name}`,
        value: `${item.description}`,
      }),
    ),
    color: MESSAGE_EMBED_COLOR,
  });
  return embedMessage;
};
