import {
  BOT_LOGO,
  BOT_NAME,
  MESSAGE_EMBED_COLOR,
  PLATFORM,
} from '@/constants/config';
import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { EmbedFieldData, MessageEmbed } from 'discord.js';

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  type: 'Song' | 'Playlist';
  length: number;
  platform: Platform;
}): MessageEmbed => {
  const author: EmbedFieldData = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedFieldData = {
    name: messages.length,
    value: payload.length.toString(),
    inline: true,
  };
  return new MessageEmbed()
    .setColor(MESSAGE_EMBED_COLOR)
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(
      `${payload.type} ${messages.addedToQueue} ${payload.author}`,
      PLATFORM[payload.platform].uri,
    )
    .setThumbnail(payload.thumbnail)
    .addFields(author, length)
    .setFooter(BOT_NAME, BOT_LOGO);
};
