import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEditDto, UserSignUpDTO } from 'src/models/user/userDTO';
import { User } from 'src/models/user/userModel';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly User: Model<User>) {}
  async register(req: UserSignUpDTO) {
    const oldUser = await this.User.findOne({ email: req.email });
    if (oldUser)
      throw new BadRequestException(
        'کاربر دیگری با این ایمیل ثبت نام کرده است!',
      );

    const user = await new this.User({
      ...req,
    });

    await user.save();
    return user;
  }

  async findOneUser(key: string, value: any): Promise<User> {
    const user = await this.User.findOne({ [key]: value });
    return user;
  }

  async updateProfile(id: string, req: UserEditDto) {
    let user = await this.User.findByIdAndUpdate(id, { ...req }, { new: true });
    if (!user) throw new NotFoundException('کاربر پیدا نشد');
    return user;
  }
}
