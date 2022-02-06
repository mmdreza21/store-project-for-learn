import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from './userModel';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'write your email',
    default: 'm@m.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'write your password',
    default: '123Asd',
  })
  password: string;
}

export class UserSignUpDTO {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  @ApiProperty({
    type: String,
    description: 'your name max:20,min:3',
    default: 'mohamad reza',
  })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  @ApiProperty({
    type: String,
    description: 'lastNAme max:20,min:3',
    default: 'javadi',
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'an email address contain ~~@~~.com',
    default: 'm@m.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'it`s most be uniq',
    default: 'mamad',
  })
  userName: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty({
    type: String,
    description:
      'password  most have at least 6 character with a {lower case} and an {upper case} word',
    default: '123Asd',
  })
  password: string;

  role?: Role;
}

export class UserEditDto {
  @MaxLength(20)
  @MinLength(3)
  @ApiProperty({
    type: String,
    description: 'your name max:20,min:3',
    default: 'new name',
  })
  firstName?: string;

  @MaxLength(20)
  @MinLength(3)
  @ApiProperty({
    type: String,
    description: 'lastNAme max:20,min:3',
    default: 'new name',
  })
  lastName?: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    type: String,
    description:
      'some address make sure it`s string but you can have more than one address this is just your first address ',
    default: ['mmd Abad', 'reza abad'],
  })
  addresses: Array<string>;
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^09/, {
    message: 'phone number must have 09',
  })
  @ApiProperty({
    type: String,
    description: 'your phone number',
    default: '09123456789',
  })
  phone: string;
}

export class UserInfo {
  @AutoMap()
  id: any;
  @AutoMap()
  fullName: string;
  @AutoMap()
  email: string;
  @AutoMap()
  Phone?: Number;
  @AutoMap()
  addresses?: Array<string>;
}
