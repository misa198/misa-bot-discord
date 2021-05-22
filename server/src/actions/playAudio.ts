import { Message, VoiceConnection } from "discord.js";
import ytdl from "ytdl-core";

import { scdl } from "../bot";

import { Platform } from "../services/types";
import { servers, Song } from "../data/server";

export const playAudio = (
  connection: VoiceConnection,
  message: Message
): void => {
  const server = servers[message.guild.id];
  let song: Song;
  if (!server.playing) {
    song = server.queue[0];
    server.playing = {
      song,
      loop: false,
    };
    server.queue.shift();
  } else if (server.playing.loop) {
    song = server.playing.song;
  } else {
    song = server.queue[0];
    server.playing = {
      song,
      loop: false,
    };
    server.queue.shift();
  }

  if (song.resource.platform === Platform.YOUTUBE) {
    server.dispatcher = connection.play(
      ytdl(song.resource.url, {
        filter: "audioonly",
        highWaterMark: 1024 * 1024 * 3,
      })
    );

    server.dispatcher.on("finish", () => {
      if (server.queue[0] || server.playing?.loop)
        playAudio(connection, message);
      else {
        server.playing = null;
        server.queue = [];
        connection.disconnect();
      }
    });
  } else {
    scdl.download(song.resource.url).then((stream) => {
      server.dispatcher = connection.play(stream);
      server.dispatcher.on("finish", () => {
        if (server.queue[0] || server.playing?.loop)
          playAudio(connection, message);
        else {
          server.playing = null;
          server.queue = [];
          connection.disconnect();
        }
      });
    });
  }
};
