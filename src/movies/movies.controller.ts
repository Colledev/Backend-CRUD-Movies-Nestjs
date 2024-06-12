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
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateMovieDto } from './dtos/movies.create.dto';
import { UpdateMovieDto } from './dtos/movies.update.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all movies',
    type: [Movie],
  })
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the movie' })
  @ApiResponse({
    status: 200,
    description: 'Returns the movie with the given ID',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({
    status: 201,
    description: 'The movie has been created successfully',
    type: Movie,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @Res() res,
  ): Promise<any> {
    const newMovie = await this.moviesService.create(createMovieDto as Movie);
    return res.status(HttpStatus.CREATED).json(newMovie);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiParam({ name: 'id', description: 'The ID of the movie' })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({
    status: 204,
    description: 'The movie has been updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res,
  ): Promise<any> {
    await this.moviesService.update(+id, updateMovieDto as Movie);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the movie' })
  @ApiResponse({
    status: 204,
    description: 'The movie has been deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  async remove(@Param('id') id: string, @Res() res): Promise<any> {
    await this.moviesService.remove(+id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
