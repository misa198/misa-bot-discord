import {
  BOT_LOGO,
  BOT_NAME,
  MESSAGE_EMBED_COLOR,
  PLATFORM,
} from '@/constants/config';
import messages from '@/constants/messages';
import { Platform } from '@/types/Song';
import { EmbedFieldData, MessageEmbed } from 'discord.js';
import moment from 'moment';

export const createPlayMessage = (payload: {
  title: string;
  url: string;
  author: string;
  thumbnail: string;
  type: 'Song' | 'Playlist';
  length: number;
  platform: Platform;
  requester: string;
}): MessageEmbed => {
  const author: EmbedFieldData = {
    name: messages.author,
    value: payload.author,
    inline: true,
  };
  const length: EmbedFieldData = {
    name: messages.length,
    value:
      payload.type === 'Playlist'
        ? payload.length.toString()
        : moment
            .utc(payload.length * 1000)
            .format(payload.length > 3600 ? 'HH:mm:ss' : 'mm:ss'),
    inline: true,
  };
  const type: EmbedFieldData = {
    name: messages.type,
    value: payload.type,
    inline: true,
  };
  return new MessageEmbed()
    .setColor(MESSAGE_EMBED_COLOR)
    .setTitle(payload.title)
    .setURL(payload.url)
    .setAuthor(
      `${payload.type} ${messages.addedToQueue} ${payload.requester}`,
      PLATFORM[payload.platform].uri,
    )
    .setThumbnail(payload.thumbnail)
    .addFields(author, length, type)
    .setFooter(BOT_NAME, BOT_LOGO);
};
