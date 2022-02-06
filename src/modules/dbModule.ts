import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/userModel';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: process.env.MONGODB_DATABASE,
      entities: [User],
      ssl: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
  ],
})
export class DbModule {}
