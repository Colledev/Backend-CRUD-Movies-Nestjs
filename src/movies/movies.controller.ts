import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() movie: Movie, @Res() res): Promise<any> {
    const newMovie = await this.moviesService.create(movie);
    return res.status(HttpStatus.CREATED).json(newMovie);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() movie: Movie,
    @Res() res,
  ): Promise<any> {
    await this.moviesService.update(+id, movie);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res): Promise<any> {
    await this.moviesService.remove(+id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
