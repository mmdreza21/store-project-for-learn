import { AutoMap } from '@automapper/classes';

export class ProductEntity {
  @AutoMap()
  id: string;
  @AutoMap()
  title: string;
  @AutoMap()
  @AutoMap()
  slug: string;
  @AutoMap()
  description: string;
  @AutoMap()
  image: string[];
  @AutoMap()
  prise: number;
  @AutoMap()
  categoryId: string[];
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
}
