import { Server } from '@/models/Server';
import { Snowflake } from 'discord.js';

export const servers = new Map<Snowflake, Server>();
