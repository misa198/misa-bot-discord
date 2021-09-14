import { servers } from '@/servers';
import { scdl } from '@/services/soundcloud';
import { Platform, Song } from '@/types/Song';
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnection,
  VoiceConnectionDisconnectReason,
  VoiceConnectionStatus,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

export interface QueueItem {
  song: Song;
  requester: string;
}

export class Server {
  public guildId: string;
  public playing?: QueueItem;
  public queue: QueueItem[];
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer;
  private isReady = false;

  constructor(voiceConnection: VoiceConnection, guildId: string) {
    this.voiceConnection = voiceConnection;
    this.audioPlayer = createAudioPlayer();
    this.queue = [];
    this.playing = undefined;
    this.guildId = guildId;

    this.voiceConnection.on('stateChange', async (_, newState) => {
      console.log(`Voice connection state changed to ${newState.status}`);
      if (newState.status === VoiceConnectionStatus.Disconnected) {
        console.log(`Reason ${newState.reason}`);
        /*
          If the WebSocket closed with a 4014 code, this means that we should not manually attempt to reconnect,
          but there is a chance the connection will recover itself if the reason of the disconnect was due to
          switching voice channels. This is also the same code for the bot being kicked from the voice channel,
          so we allow 5 seconds to figure out which scenario it is. If the bot has been kicked, we should destroy
          the voice connection.
				*/
        if (
          newState.reason === VoiceConnectionDisconnectReason.WebSocketClose &&
          newState.closeCode === 4014
        ) {
          try {
            await entersState(
              this.voiceConnection,
              VoiceConnectionStatus.Connecting,
              5_000,
            );
          } catch (e) {
            this.voiceConnection.destroy();
            this.leave();
          }
        } else if (this.voiceConnection.rejoinAttempts < 5) {
          this.voiceConnection.rejoin();
        } else {
          this.voiceConnection.destroy();
          this.leave();
        }
      } else if (newState.status === VoiceConnectionStatus.Destroyed) {
        this.leave();
      } else if (
        !this.isReady &&
        (newState.status === VoiceConnectionStatus.Connecting ||
          newState.status === VoiceConnectionStatus.Signalling)
      ) {
        /*
					In the Signalling or Connecting states, we set a 20 second time limit for the connection to become ready
					before destroying the voice connection. This stops the voice connection permanently existing in one of these
					states.
				*/
        this.isReady = true;
        try {
          await entersState(
            this.voiceConnection,
            VoiceConnectionStatus.Ready,
            20_000,
          );
        } catch {
          if (
            this.voiceConnection.state.status !==
            VoiceConnectionStatus.Destroyed
          )
            this.voiceConnection.destroy();
        } finally {
          this.isReady = false;
        }
      }
    });

    // Configure audio player
    this.audioPlayer.on('stateChange', async (oldState, newState) => {
      if (
        newState.status === AudioPlayerStatus.Idle &&
        oldState.status !== AudioPlayerStatus.Idle
      ) {
        await this.play();
      }
    });

    voiceConnection.subscribe(this.audioPlayer);
  }

  public async addSongs(queueItems: QueueItem[]): Promise<void> {
    this.queue = this.queue.concat(queueItems);
    if (!this.playing) {
      await this.play();
    }
  }

  public stop(): void {
    this.playing = undefined;
    this.queue = [];
    this.audioPlayer.stop();
  }

  public leave(): void {
    this.stop();
    servers.delete(this.guildId);
  }

  public async play(): Promise<void> {
    try {
      if (this.queue.length > 0) {
        this.playing = this.queue.shift() as QueueItem;
        let stream: any;
        const highWaterMark = 1024 * 1024 * 10;
        if (this.playing?.song.platform === Platform.YOUTUBE) {
          stream = ytdl(this.playing.song.url, { highWaterMark });
        } else {
          stream = await scdl.download(this.playing.song.url, {
            highWaterMark,
          });
        }
        const audioResource = createAudioResource(stream);
        this.audioPlayer.play(audioResource);
      } else {
        this.playing = undefined;
        this.audioPlayer.stop();
      }
    } catch (e) {
      this.play();
    }
  }
}
