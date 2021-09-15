import { Platform } from '@/types/Song';

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export const TOKEN = process.env.TOKEN;
export const PREFIX = '!';
export const DEFAULT_SOUND_CLOUD_ARTWORK =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621600068/misabot-discord/58af04446c252499281ae91f_zzjc86.png';

export const SOUND_CLOUD_LOGO =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621607196/misabot-discord/soundcloud_kfwdtz.png';

export const YOUTUBE_LOGO =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621607197/misabot-discord/youtube_af1h05.png';

export const PLATFORM = {
  [Platform.YOUTUBE.toString()]: {
    uri: YOUTUBE_LOGO,
    name: 'Youtube',
  },
  [Platform.SOUND_CLOUD.toString()]: {
    uri: SOUND_CLOUD_LOGO,
    name: 'SoundCloud',
  },
};

export const MESSAGE_EMBED_COLOR = '#0099ff';
export const BOT_NAME = 'Misabot';
export const BOT_LOGO =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621607524/misabot-discord/misabot-footer_nqcfen.png';
