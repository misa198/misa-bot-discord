import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: "loop",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        server.playing.loop = true;
        const song = server.playing.song;
        const messageEmbed = new MessageEmbed()
          .setURL(song.resource.url)
          .setColor("#0099ff")
          .setTitle(song.resource.title)
          .setAuthor(`Loop by ${message.member.displayName} 🔁`)
          .setThumbnail(song.resource.thumbnail)
          .addFields(
            { name: "Channel", value: song.resource.author, inline: true },
            {
              name: "Length",
              value: formatTimeRange(song.resource.length),
              inline: true,
            },
            {
              name: "Order by",
              value: song.requester,
              inline: false,
            }
          );

        message.channel.send(messageEmbed).then(() => server.dispatcher.end());
      } else {
        message.channel.send("❌ Nothing to loop!");
      }
    } else {
      message.channel.send("❌ Nothing to loop!");
    }
  },
};
