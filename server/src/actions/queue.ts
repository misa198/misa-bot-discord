import { Message, MessageEmbed } from "discord.js";
import { formatTimeRange } from "../utils/time";

import { servers } from "../data/server";

export default {
  name: "queue",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (!server.playing && server.queue.length === 0)
        message.channel.send("❌ Queue is empty!");
      else {
        const queue = server.queue;
        const upNext = [];
        let page = "";

        if (queue.length > 0) {
          let i = 0;
          while (i < queue.length) {
            if (i % 5 === 4) {
              upNext.push(page);
              page = "";
            } else {
              page = page.concat(
                `${i + 1}. [${queue[i].resource.title}](${
                  queue[i].resource.url
                }) | ${formatTimeRange(
                  queue[i].resource.length
                )} | Requested by ${queue[i].requester}\n`
              );
            }
            i++;
          }
        } else upNext.push("Nothing!");

        upNext.forEach((item, index) => {
          let messageEmbed;
          if (index === 0) {
            messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Queue 🎵")
              .addFields({
                name: "Playing",
                value: `[${server.playing.song.resource.title}](${
                  server.playing.song.resource.url
                }) | ${formatTimeRange(
                  server.playing.song.resource.length
                )} | Requested by ${server.playing.song.requester}`,
                inline: false,
              })
              .addFields({
                name: "Next",
                value: `${item}`,
                inline: false,
              });
          } else {
            messageEmbed = new MessageEmbed().setColor("#0099ff").addFields({
              name: "Next",
              value: `${item}`,
              inline: false,
            });
          }
          message.channel.send(messageEmbed);
        });
      }
    } else message.channel.send("❌ Queue is empty!");
  },
};
