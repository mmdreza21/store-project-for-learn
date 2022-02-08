import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ObjectId } from 'bson';

import { PrismaService } from 'src/Prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.UserCreateInput) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (oldUser)
      throw new BadRequestException(
        'کاربر دیگری با این ایمیل ثبت نام کرده است!',
      );
    return this.prisma.user.create({
      data,
    });
  }

  async findOneUser(key: string, value: string | ObjectId): Promise<User> {
    const user: User = await this.prisma.user.findFirst({
      where: { [key]: value },
    });

    return user;
  }

  async userProfile(id) {
    console.log(id.id);

    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    req: Prisma.UserUpdateInput,
  ): Promise<User> {
    let user = await this.prisma.user.update({
      data: req,
      where,
    });
    console.log(user);

    if (!user) throw new NotFoundException('کاربر پیدا نشد');
    return user;
  }
}
