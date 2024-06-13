import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), CacheModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
