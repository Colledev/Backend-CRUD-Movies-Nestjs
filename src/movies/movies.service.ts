import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

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

  async create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  async update(id: number, movie: Movie): Promise<void> {
    await this.movieRepository.update(id, movie);
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
