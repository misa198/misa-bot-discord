import { Message } from 'discord.js';

export const checkVoiceChannel = (message: Message): boolean => {
  if (!message.member?.voice.channel) {
    message.channel.send('❌ You must be in a voice channel!');
    return false;
  }
  return true;
};

export const checkBotInVoiceChannel = (message: Message): boolean => {
  if (!message.member?.voice.channel) {
    message.channel.send('❌ I must be in a voice channel!');
    return false;
  }
  return true;
};
