import { Message } from "discord.js";

export const checkUserInVoiceChannel = (
  message: Message,
  cb: () => void
): void => {
  if (!message.member.voice.channel) {
    message.channel.send("❌ You must be in a voice channel!");
  } else cb();
};

export const checkBotInVoiceChannel = (
  message: Message,
  cb: () => void
): void => {
  if (!message.guild.voice?.connection) {
    message.channel.send("❌ I must be in a voice channel!");
  } else cb();
};
