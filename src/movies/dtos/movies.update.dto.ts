import { PartialType } from '@nestjs/swagger';
import { CreateMovieDto } from './movies.create.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
