import { PREFIX } from '@/constants/config';

export const processMessageContent = (
  content: string,
): [string | undefined, string | undefined] => {
  if (content.startsWith(PREFIX)) {
    const command = content.split(PREFIX)[1].split(' ')[0];
    const value = content.split(PREFIX.concat(command).concat(' '))[1];
    return [command, value];
  }
  return [undefined, undefined];
};
