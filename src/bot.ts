import { Client } from "discord.js";

import { prefix } from "./constant/config";
import play from "./actions/play";
import skip from "./actions/skip";

const bot = (): void => {
  const client = new Client();
  const token = process.env.TOKEN;

  client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    switch (args[0]) {
      case play.name:
        play.execute(message, content);
        break;
      case skip.name:
        skip.execute(message);
        break;
    }
  });

  client.login(token);

  client.on("ready", () => {
    console.log("🏃‍♀️ Misabot is online! 💨");
  });

  client.once("reconnecting", () => {
    console.log("🔗 Reconnecting!");
  });

  client.once("disconnect", () => {
    console.log("🛑 Disconnect!");
  });
};

export default bot;
