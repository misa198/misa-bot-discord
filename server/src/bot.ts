import { Client } from "discord.js";

import { prefix } from "./constant/config";
import play from "./actions/play";
import skip from "./actions/skip";
import nowplaying from "./actions/nowplaying";
import pause from "./actions/pause";
import resume from "./actions/resume";
import stop from "./actions/stop";
import clear from "./actions/clear";
import queue from "./actions/queue";

const bot = (): void => {
  const client = new Client();
  const token = process.env.TOKEN;

  client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    if (message.content[0] === "!") {
      switch (args[0]) {
        case "p":
        case play.name:
          play.execute(message, content);
          break;
        case skip.name:
        case "fs":
          skip.execute(message);
          break;
        case nowplaying.name:
        case "np":
          nowplaying.execute(message);
          break;
        case pause.name:
          pause.execute(message);
          break;
        case resume.name:
          resume.execute(message);
          break;
        case stop.name:
          stop.execute(message);
          break;
        case clear.name:
          clear.execute(message);
          break;
        case queue.name:
          queue.execute(message);
          break;
      }
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
