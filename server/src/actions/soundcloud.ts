import { Message, VoiceConnection, MessageEmbed } from "discord.js";
import scdl from "soundcloud-downloader";
const clientId = process.env.CLIENT_ID || "";

const play = (connection: VoiceConnection, message: Message) => {
  scdl.download(SOUNDCLOUD_URL).then((stream) => connection.play(stream));
};

export default {
  name: "play",
  execute: (message: Message, content: string): void => {
    if (!message.guild.voice) {
      message.member.voice.channel.join().then((connection) => {
        play(connection, message);
      });
    } else if (!message.guild.voice.connection) {
      message.member.voice.channel.join().then((connection) => {
        play(connection, message);
      });
    }
  },
};
