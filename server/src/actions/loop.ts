import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";
import { misabotLogo } from "../constant/config";
import { platforms } from "../services/youtube";

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
          .setAuthor(
            `Loop by ${message.member.displayName} 🔁`,
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
              inline: false,
            }
          )
          .setFooter(`Misabot © ${new Date().getFullYear()}`, misabotLogo);

        message.channel.send(messageEmbed);
      } else {
        message.channel.send("❌ Nothing to loop!");
      }
    } else {
      message.channel.send("❌ Nothing to loop!");
    }
  },
};
