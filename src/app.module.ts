import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { AutoMapper } from './utils/modules/autoMapper.module';
import { ExModule } from './ex/ex.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    CartModule,
    AutoMapper,
    ExModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
