import { AutoMap } from '@automapper/classes';

import { compare } from 'bcryptjs';
import { Schema } from 'mongoose';

export enum Role {
  AdminOfSite = 'AdminOfSite',
  User = 'User',
  Seller = 'Seller',
}

export class User {
  @AutoMap()
  role: Role;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  Phone: string;
  @AutoMap()
  addresses: Array<string>;
  @AutoMap()
  id: any;

  @AutoMap()
  email: string;
  userName: string;
  resetPassToken: string;
  dateOfToken: Date;
  password: string;
  validatePassword: (password: string) => boolean;
}

export const userSchema: Schema = new Schema({
  role: {
    type: String,
    enum: [Role.AdminOfSite, Role.Seller, Role.User],
    default: Role.User,
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  addresses: { type: Array },
  userName: { type: String, required: true },
  phone: { type: String },

  resetPassToken: String,
  dateOfToken: Date,
  password: { type: String, required: true },
});
userSchema.methods.validatePassword = function (password: string) {
  return compare(password, this.password);
};
