import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @ApiProperty({
    default: 'tech',
    description: 'choose a description for your category and its ((unique))',
  })
  @MinLength(3)
  title: string;
}
