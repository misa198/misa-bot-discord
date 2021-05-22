import { Client } from "discord.js";
import { SoundCloud } from "scdl-core";

import { prefix } from "./constant/config";
import play from "./actions/play";
import soundcloud from "./actions/soundcloud";
import skip from "./actions/skip";
import nowplaying from "./actions/nowplaying";
import pause from "./actions/pause";
import resume from "./actions/resume";
import stop from "./actions/stop";
import clear from "./actions/clear";
import queue from "./actions/queue";
import select from "./actions/select";
import loop from "./actions/loop";
import remove from "./actions/remove";

import {
  checkUserInVoiceChannel,
  checkBotInVoiceChannel,
} from "./utils/check-voice-channel";

export const scdl = new SoundCloud();

const bot = (): void => {
  scdl.connect().then(() => {
    const client = new Client();
    const token = process.env.TOKEN;

    client.on("message", (message) => {
      const args = message.content.substring(prefix.length).split(" ");
      const content = message.content
        .substring(prefix.length + args[0].length)
        .trim();

      if (message.content[0] === "!") {
        switch (args[0]) {
          case "p":
          case play.name:
            checkUserInVoiceChannel(message, () =>
              play.execute(message, content)
            );
            break;
          case "sc":
          case soundcloud.name:
            checkUserInVoiceChannel(message, () =>
              soundcloud.execute(message, content)
            );
            break;
          case skip.name:
          case "fs":
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => skip.execute(message))
            );
            break;
          case nowplaying.name:
          case "np":
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => nowplaying.execute(message))
            );
            break;
          case pause.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => pause.execute(message))
            );
            break;
          case resume.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => resume.execute(message))
            );
            break;
          case stop.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => stop.execute(message))
            );
            break;
          case clear.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => clear.execute(message))
            );
            break;
          case queue.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => queue.execute(message))
            );
            break;
          case select.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () =>
                select.execute(message, content)
              )
            );
            break;
          case loop.name:
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () => loop.execute(message))
            );
            break;
          case remove.name:
          case "rm":
            checkUserInVoiceChannel(message, () =>
              checkBotInVoiceChannel(message, () =>
                remove.execute(message, content)
              )
            );
            break;
        }
      }
    });

    client.on("ready", () => {
      console.log("🏃‍♀️ Misabot is online! 💨");
    });

    client.on("reconnecting", () => {
      console.log("🔗 Reconnecting!");
    });

    client.on("disconnect", () => {
      console.log("🛑 Disconnect!");
    });

    client.login(token);
  });
};

export default bot;
