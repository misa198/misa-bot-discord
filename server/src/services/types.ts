export enum Platform {
  YOUTUBE,
  SOUNDCLOUD,
}

export interface Resource {
  title: string;
  length: number;
  author: string;
  thumbnail: string;
  url: string;
  platform: Platform;
}
