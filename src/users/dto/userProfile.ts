import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserDTO } from './create-user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(UserEntity, UserDTO).forMember(
        (a) => a.fullName,
        mapFrom((user: UserEntity) => {
          return user.firstName + ' ' + user.lastName;
        }),
      );
    };
  }
}
