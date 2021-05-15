import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "skip",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server.dispatcher) {
      server.dispatcher.end();
    }
  },
};
