import {} from '@discordjs/voice';
import { Song } from '@/types/Song';

interface QueueItem {
  song: Song;
  requester: string;
}

export class Server {
  playing?: Song;
  queue: QueueItem[] = [];
}
