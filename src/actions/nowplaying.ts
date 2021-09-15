import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";
import { misabotLogo, platforms } from "../constant/config";

export default {
  name: "nowplaying",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (!server.playing) {
        message.channel.send("❌ Nothing is played now!");
      } else {
        const song = server.playing.song;
        const messageEmbed = new MessageEmbed()
          .setURL(song.resource.url)
          .setColor("#0099ff")
          .setTitle(song.resource.title)
          .setAuthor(
            `Playing 🎵`,
            platforms[song.resource.platform.toString()].uri
          )
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
              inline: true,
            },
            {
              name: "Loop",
              value: server.playing.loop ? "Yes" : "No",
              inline: true,
            }
          )
          .setFooter(`Misabot © ${new Date().getFullYear()}`, misabotLogo);
        message.channel.send(messageEmbed);
      }
    } else {
      message.channel.send("❌ Nothing is played now!");
    }
  },
};
