import { Message, VoiceConnection, MessageEmbed } from "discord.js";
import ytdl from "ytdl-core";

import { servers, Song } from "../data/server";
import { getVideoDetails, getPlaylist } from "../services/youtube";
import { formatTimeRange } from "../utils/time";
import { youtubePlaylistRegex } from "../constant/regex";

const play = (connection: VoiceConnection, message: Message) => {
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

  server.dispatcher = connection.play(
    ytdl(song.resource.url, {
      filter: "audioonly",
      highWaterMark: 1024 * 1024 * 3,
    })
  );
  server.dispatcher.on("finish", () => {
    if (server.queue[0]) play(connection, message);
    else {
      server.playing = null;
      server.queue = [];
      connection.disconnect();
    }
  });
};

export default {
  name: "play",
  execute: (message: Message, content: string): void => {
    if (!content)
      message.channel.send(
        "❌ You need to provide an Youtube URL or name of video\n\n✅ Ex: !play Shape of You"
      );
    else {
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: [],
        };
      const server = servers[message.guild.id];

      const paths = content.match(youtubePlaylistRegex);
      if (paths) {
        getPlaylist(paths[0])
          .then((result) => {
            const resources = result.resources;

            const messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setURL(paths[0])
              .setTitle(result.title)
              .setAuthor(
                `➕ Add playlist to order by ${message.member.displayName}`
              )
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Author", value: result.author, inline: true },
                {
                  name: "Video count",
                  value: resources.length,
                  inline: true,
                }
              );

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice) {
                server.queue = [];
                resources.forEach((resource) => {
                  server.queue.push({
                    requester: message.member.displayName,
                    resource: resource,
                  });
                });
                server.playing = null;
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              } else if (!message.guild.voice.connection) {
                server.queue = [];
                resources.forEach((resource) => {
                  server.queue.push({
                    requester: message.member.displayName,
                    resource: resource,
                  });
                });
                server.playing = null;
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              } else {
                resources.forEach((resource) => {
                  server.queue.push({
                    requester: message.member.displayName,
                    resource: resource,
                  });
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
      } else
        getVideoDetails(content)
          .then((result) => {
            const messageEmbed = new MessageEmbed()
              .setURL(result.url)
              .setColor("#0099ff")
              .setTitle(result.title)
              .setAuthor(`Add to order by ${message.member.displayName}`)
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Channel", value: result.author, inline: true },
                {
                  name: "Length",
                  value: formatTimeRange(result.length),
                  inline: true,
                }
              )
              .addField("Position in order", server.queue.length, true);

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice) {
                server.queue = [];
                server.queue.push({
                  requester: message.member.displayName,
                  resource: result,
                });
                server.playing = null;
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              } else if (!message.guild.voice.connection) {
                server.queue = [];
                server.queue.push({
                  requester: message.member.displayName,
                  resource: result,
                });
                server.playing = null;
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              } else {
                server.queue.push({
                  requester: message.member.displayName,
                  resource: result,
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
    }
  },
};
