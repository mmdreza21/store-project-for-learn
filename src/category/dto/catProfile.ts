import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CatDTO } from './create-category.dto';

@Injectable()
export class CatProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(CategoryEntity, CatDTO);
    };
  }
}
