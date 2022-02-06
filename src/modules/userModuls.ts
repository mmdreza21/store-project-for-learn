import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from 'src/controllers/userControllers';
import { User } from 'src/models/user/userModel';
import { UserProfile } from 'src/models/user/userProfile';

import { UserService } from 'src/services/userServices';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
