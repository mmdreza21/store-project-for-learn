import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEditDto, UserSignUpDTO } from 'src/models/user/userDTO';
import { User } from 'src/models/user/userModel';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}
  async register(req: UserSignUpDTO) {
    const oldUser = await this.user.findOne({
      email: req.email,
    });
    if (oldUser)
      throw new BadRequestException(
        'کاربر دیگری با این ایمیل ثبت نام کرده است!',
      );

    const newUser = await this.user.create({
      ...req,
    });
    await this.user.save(newUser);

    return newUser;
  }

  // async findOneUser(): Promise<User> {
  //   const user = new User();
  //   return user;
  // }

  // async updateProfile() {
  //   let user = await new User();
  //   if (!user) throw new NotFoundException('کاربر پیدا نشد');
  //   return user;
  // }
}
