import { AutoMap } from '@automapper/classes';

export class CategoryEntity {
  @AutoMap()
  id: string;
  @AutoMap()
  title: string;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
}
