import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { genSalt, hash } from 'bcryptjs';
import { UserEditDto, UserInfo, UserSignUpDTO } from 'src/models/user/userDTO';
import { User } from 'src/models/user/userModel';
import { UserService } from 'src/services/userServices';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Post('register')
  @ApiOkResponse({ description: 'you did register' })
  async createUser(@Body() req: UserSignUpDTO) {
    const salt = await genSalt(10);
    const password = await hash(req.password, salt);

    const user = await this.userService.register({ ...req, password });
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @Patch('updateUser')
  @ApiResponse({ description: 'new user' })
  async updateProfile(
    @Body() req: UserEditDto,
    @Request() { user }: { user: { userId } },
  ) {
    return this.userService.updateProfile(user.userId, req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWT-auth')
  @ApiResponse({ description: 'user all info' })
  @Get('profile')
  // @UseInterceptors(MapInterceptor(UserInfo, User, { isArray: false }))
  async userInfo(@Request() { user: { userID } }) {
    const user: User = await this.userService.findOneUser('id', userID);

    // const userInfo = {
    //   id: user._id,
    //   fullName: user.firstName + user.lastName,
    //   email: user.email,
    //   phone: user.Phone,
    //   addresses: user.addresses,
    // };
    //@ts-ignore
    return this.mapper.map(user._doc, UserInfo, User);
  }
}
