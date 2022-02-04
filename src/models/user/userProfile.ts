import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from './userModel';
import { UserInfo } from './userDTO';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(User, UserInfo).forMember(
        (a) => a.fullName,
        mapFrom((user: User) => {
          return user.firstName + ' ' + user.lastName;
        }),
      );
    };
  }
}
