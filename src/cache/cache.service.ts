import { Injectable } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';
import Cache from './cache.interface';

@Injectable()
export class CacheRedisService implements Cache {
  private readonly redisClient: Redis;

  constructor() {
    const options: RedisOptions = {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    };

    this.redisClient = new Redis(options);

    this.redisClient.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  async getValues(key: string): Promise<any | undefined> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  async setValues(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async deleteValues(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
