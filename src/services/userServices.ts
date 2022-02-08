import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEditDto, UserSignUpDTO } from 'src/models/user/userDTO';
import { User } from 'src/models/user/userModel';
import { ObjectID, Repository } from 'typeorm';

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

  async findOneUser(
    key: string,
    value: ObjectID | string,
  ): Promise<User | null> {
    const user = await this.user.findOne({ [key]: value });
    return user;
  }

  async updateProfile(id: ObjectID, req: UserEditDto) {
    let user = await this.user.update(id, { ...req });
    if (!user) throw new NotFoundException('کاربر پیدا نشد');
    return user;
  }
}
