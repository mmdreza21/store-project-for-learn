import { AutoMap } from '@automapper/classes';

export enum Role {
  AdminOfSite = 'AdminOfSite',
  User = 'User',
  Seller = 'Seller',
}
export class UserEntity {
  @AutoMap()
  id: string;
  @AutoMap()
  role: Role;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  phone: string | null;
  @AutoMap()
  addresses: Array<string>;
  @AutoMap()
  email: string;
  @AutoMap()
  userName: string;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;

  password: string;
  resetPassToken: string | null;
  dateOfToken: Date | null;
}
