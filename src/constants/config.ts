import { Platform } from '@/types/Song';

export const TOKEN = process.env.TOKEN;
export const PREFIX = '!';
export const DEFAULT_SOUND_CLOUD_ARTWORK =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621600068/misabot-discord/58af04446c252499281ae91f_zzjc86.png';

export const SOUND_CLOUD_LOGO =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621607196/misabot-discord/soundcloud_kfwdtz.png';

export const YOUTUBE_LOGO =
  'https://res.cloudinary.com/dumfvnj9f/image/upload/v1621607197/misabot-discord/youtube_af1h05.png';

export const platforms = {
  [Platform.YOUTUBE.toString()]: {
    uri: YOUTUBE_LOGO,
    name: 'Youtube',
  },
  [Platform.SOUND_CLOUD.toString()]: {
    uri: SOUND_CLOUD_LOGO,
    name: 'SoundCloud',
  },
};
