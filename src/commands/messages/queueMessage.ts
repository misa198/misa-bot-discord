import { MESSAGE_EMBED_COLOR } from '@/constants/config';
import messages from '@/constants/messages';
import { QueueItem } from '@/models/Server';
import { formatSeconds } from '@/utils/formatTime';
import { MessageEmbed } from 'discord.js';

const MAX_SONGS_PER_PAGE = 10;

const generatePageMessage = (items: QueueItem[], start: number) => {
  const embedMessage = new MessageEmbed({
    title: messages.yourQueue,
    fields: items.map((item, index) => ({
      name: `${start + 1 + index}. ${item.song.title} | ${item.song.author}`,
      value: `${formatSeconds(item.song.length)} | ${item.song.platform} | ${
        messages.addedToQueue
      } ${item.requester}`,
    })),
    color: MESSAGE_EMBED_COLOR,
  });
  return embedMessage;
};

export const createQueueMessages = (queue: QueueItem[]): MessageEmbed[] => {
  if (queue.length < MAX_SONGS_PER_PAGE) {
    const embedMessage = generatePageMessage(queue, 0);
    return [embedMessage];
  } else {
    const embedMessages = [];
    for (let i = 0; i < queue.length; i += MAX_SONGS_PER_PAGE) {
      const items = generatePageMessage(
        queue.slice(i, i + MAX_SONGS_PER_PAGE),
        i,
      );
      embedMessages.push(items);
    }
    return embedMessages;
  }
};
