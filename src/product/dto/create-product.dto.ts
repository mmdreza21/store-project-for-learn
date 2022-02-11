import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: 'title for the product', default: 'laptop' })
  title: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'slug for nice urls for the product',
    default: 'laptop',
  })
  @AutoMap()
  slug: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'description for the product',
    default: 'this is nice fucking laptop',
  })
  @AutoMap()
  description: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'how much it coast ', default: 30000 })
  @AutoMap()
  prise: number;
  @IsNotEmpty()
  @ApiProperty({
    description: 'a aray of category that most be a object id for the product',
    default: ['6202b84602a7a346c39e7c30'],
  })
  @AutoMap()
  categoryId: Array<string>;
}
