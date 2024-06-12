import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A mind-bending thriller',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Sci-Fi' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({
    example: 148,
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    example: 'Christopher Nolan',
  })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    example: 2010,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
