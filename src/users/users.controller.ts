import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserSignUpDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Post()
  async create(@Body() createUserDto: UserSignUpDTO) {
    const salt = await genSalt(10);
    const password = await hash(createUserDto.password, salt);

    return this.usersService.create({ ...createUserDto, password });
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiResponse({ description: 'user all info' })
  @Get('profile')
  // @UseInterceptors(MapInterceptor(UserInfo, User, { isArray: false }))
  async userInfo(@Request() req): Promise<UserDTO> {
    const user: User = await this.usersService.findOneUser(
      'id',
      req.user.userId,
    );

    return this.mapper.map(user, UserDTO, UserEntity);
  }
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @Patch()
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ id: req.user.userId }, updateUserDto);
  }
}
