import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: "skip",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher) {
        if (server.queue.length === 0) {
          server.dispatcher.end();
          server.playing = null;
          message.channel.send("❌ Nothing to skip!");
        } else {
          const song = server.queue[0];
          const messageEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(song.resource.title)
            .setAuthor(`Skipped by ${message.member.displayName}`)
            .setThumbnail(song.resource.thumbnail)
            .addFields(
              { name: "Channel", value: song.resource.author, inline: true },
              {
                name: "Length",
                value: formatTimeRange(song.resource.length),
                inline: true,
              }
            )
            .setImage(song.resource.avatar);

          message.channel
            .send(messageEmbed)
            .then(() => server.dispatcher.end());
        }
      } else message.channel.send("❌ Nothing to skip!");
    } else {
      message.channel.send("❌ Nothing to skip!");
    }
  },
};
