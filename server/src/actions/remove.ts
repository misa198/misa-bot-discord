import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: "remove",
  execute: (message: Message, content: string): void => {
    let selectedSong = -1;
    try {
      selectedSong = parseInt(content, 10);
    } catch (e) {
      message.channel.send("❌ Invalid param!");
    }

    if (
      selectedSong < 1 ||
      !Number.isInteger(selectedSong) ||
      isNaN(selectedSong)
    ) {
      message.channel.send("❌ Invalid param!");
    } else {
      const server = servers[message.guild.id];
      if (server) {
        if (server.dispatcher) {
          if (server.queue.length === 0 || server.queue.length < selectedSong) {
            message.channel.send("❌ Invalid param!");
          } else {
            const song = server.queue[selectedSong - 1];
            server.queue.splice(selectedSong - 1, 1);
            const messageEmbed = new MessageEmbed()
              .setURL(song.resource.url)
              .setColor("#0099ff")
              .setTitle(song.resource.title)
              .setAuthor(`🗑 Removed by ${message.member.displayName}`)
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
            message.channel.send(messageEmbed);
          }
        } else message.channel.send("❌ Nothing to remove!");
      } else {
        message.channel.send("❌ Nothing to remove!");
      }
    }
  },
};
