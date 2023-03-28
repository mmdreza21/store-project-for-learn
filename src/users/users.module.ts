import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/Prisma.service';
import { UserProfile } from './dto/userProfile';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserProfile],
  exports: [UsersService],
})
export class UsersModule {}
