import { Module } from '@nestjs/common';
import { CacheRedisService } from './cache.service';

@Module({
  providers: [CacheRedisService],
  exports: [CacheRedisService],
})
export class CacheModule {}
