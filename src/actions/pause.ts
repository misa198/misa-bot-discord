import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: "pause",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher) {
        message.channel.send("⏸ Paused").then(() => server.dispatcher.pause());
      }
    } else message.channel.send("❌ Nothing to pause!");
  },
};
