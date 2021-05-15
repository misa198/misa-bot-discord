import { config } from "dotenv";
config();

import { Client } from "discord.js";

import { prefix } from "./constant/config";
import { getAudioUrl } from "./services/youtube";

const client = new Client();
const token = process.env.TOKEN;

client.on("ready", () => {
  console.log("🚀 Misabox is online! ✨");
});

client.once("reconnecting", () => {
  console.log("🔗 Reconnecting!");
});

client.once("disconnect", () => {
  console.log("🛑 Disconnect!");
});

client.on("message", (message) => {
  const args = message.content.substring(prefix.length).split(" ");

  const content = message.content.substring(prefix.length + args[0].length);

  switch (args[0]) {
    case "play":
      if (!content)
        message.channel.send(
          "❌ You need to provide an Youtube URL or name of video\n\n✅ Ex: !play Shape of You"
        );
      else
        getAudioUrl(content)
          .then((result) => message.channel.send(result))
          .catch((e) => message.channel.send(e));
      break;
  }
});

client.login(token);
