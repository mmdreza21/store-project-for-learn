import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    default: 'tech',
    description: 'choose a description for your category and its ((unique))',
  })
  @MinLength(3)
  title: string;
}

export class ObjectIdDto {
  @IsObjectId()
  id: string;
}

export class catDTO {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
