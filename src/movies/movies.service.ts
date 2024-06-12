import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dtos/movies.create.dto';
import { UpdateMovieDto } from './dtos/movies.update.dto';
import { CacheRedisService } from '../cache/cache.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private cacheService: CacheRedisService,
  ) {}

  async findAll(): Promise<Movie[]> {
    const cacheKey = 'movies';
    let movies = await this.cacheService.getValues(cacheKey);

    if (!movies) {
      movies = await this.movieRepository.find();
      await this.cacheService.setValues(cacheKey, movies);
    }

    return movies;
  }

  async findOne(id: number): Promise<Movie> {
    const cacheKey = `movie_${id}`;
    let movie = await this.cacheService.getValues(cacheKey);

    if (!movie) {
      movie = await this.movieRepository.findOneBy({ id });
      await this.cacheService.setValues(cacheKey, movie);
    }

    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    const newMovie = await this.movieRepository.save(movie);
    await this.cacheService.deleteValues('movies');
    return newMovie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<void> {
    await this.movieRepository.update(id, updateMovieDto);
    await this.cacheService.deleteValues('movies');
    await this.cacheService.deleteValues(`movie_${id}`);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
    await this.cacheService.deleteValues('movies');
    await this.cacheService.deleteValues(`movie_${id}`);
  }
}
