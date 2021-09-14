import { processMessageContent } from '@/utils/message';
import { checkVoiceChannel } from '@/utils/voice';
import { Client } from 'discord.js';

const commands = (client: Client): void => {
  client.on('messageCreate', (message) => {
    const { content } = message;
    const [command, value] = processMessageContent(content);
    if (command) {
      switch (command) {
        case 'p': {
          if (checkVoiceChannel(message)) {
            message.channel.send('Hello');
          }
        }
      }
    }
  });
};

export default commands;
