import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

// import { compare } from 'bcryptjs';

export enum Role {
  AdminOfSite = 'AdminOfSite',
  User = 'User',
  Seller = 'Seller',
}
@Entity()
export class User {
  @AutoMap()
  @ObjectIdColumn()
  id: any;
  @AutoMap()
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
  @AutoMap()
  @Column()
  firstName: string;
  @AutoMap()
  @Column()
  lastName: string;
  @AutoMap()
  @Column()
  Phone: string;
  @AutoMap()
  @Column()
  addresses: Array<string>;
  @AutoMap()
  @Column()
  @Column()
  email: string;
  @Column()
  userName: string;
  @Column()
  password: string;
  @Column()
  resetPassToken: string;
  @Column()
  dateOfToken: Date;

  // validatePassword: (password: string) => boolean;
}
