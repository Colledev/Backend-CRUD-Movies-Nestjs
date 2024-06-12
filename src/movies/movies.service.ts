import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dtos/movies.create.dto';
import { UpdateMovieDto } from './dtos/movies.update.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOneBy({ id });
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<void> {
    await this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
