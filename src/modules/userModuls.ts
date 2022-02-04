import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from 'src/controllers/userControllers';
import { userSchema } from 'src/models/user/userModel';
import { UserProfile } from 'src/models/user/userProfile';
import { UserService } from 'src/services/userServices';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
