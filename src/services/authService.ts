import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/models/user/userDTO';

import { UserService } from './userServices';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async LoginDto(req: LoginDto) {
    const user = await this.validate(req);
    return {
      accessToken: this.jwtService.sign({ userId: user.id, role: user.role }),
    };
  }

  async validate({ email, password }: LoginDto) {
    const user = await this.userService.findOneUser('email', email);
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('ایمیل یا کلمه عبپور شما اشتباه است');
    }
    return user;
  }
}
