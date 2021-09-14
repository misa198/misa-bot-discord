import messages from '@/constants/messages';
import { QueueItem, Server } from '@/models/Server';
import { servers } from '@/servers';
import { YoutubeService } from '@/services/youtube';
import { Platform } from '@/types/Song';
import {
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import { CommandInteraction, GuildMember } from 'discord.js';
import { createPlayMessage } from '../messages/playMessage';

export const play = {
  name: 'play',
  execute: async (interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();
    let server = servers.get(interaction.guildId as string);
    if (!server) {
      if (
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel
      ) {
        const channel = interaction.member.voice.channel;
        server = new Server(
          joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          }),
        );
        server.voiceConnection.on('error', console.warn);
        servers.set(interaction.guildId as string, server);
      }
    }

    if (!server) {
      await interaction.followUp(messages.joinVoiceChannel);
      return;
    }

    // Make sure the connection is ready before processing the user's request
    try {
      await entersState(
        server.voiceConnection,
        VoiceConnectionStatus.Ready,
        20e3,
      );
    } catch (error) {
      console.warn(error);
      await interaction.followUp(messages.failToJoinVoiceChannel);
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const input = interaction.options.get('input')!.value! as string;
      const playListId = YoutubeService.isPlaylist(input);
      if (playListId) {
        const playlist = await YoutubeService.getPlaylist(playListId);
        const songs = playlist.songs.map((song) => {
          const queueItem: QueueItem = {
            song,
            requester: interaction.member?.user.username as string,
          };
          return queueItem;
        });
        server.addSongs(songs);
      } else {
        const song = await YoutubeService.getVideoDetails(input);
        const queueItem: QueueItem = {
          song,
          requester: interaction.member?.user.username as string,
        };
        server.addSongs([queueItem]);
        interaction.followUp({
          embeds: [
            createPlayMessage({
              title: song.title,
              url: song.url,
              author: song.author,
              thumbnail: song.thumbnail,
              type: 'Song',
              length: song.length,
              platform: Platform.YOUTUBE,
            }),
          ],
        });
      }
      await server.play();
    } catch (error) {
      await interaction.followUp(messages.failToPlay);
    }
  },
};
