import { Module } from '@nestjs/common';
import { ProductController } from 'src/controllers/productControlers';

@Module({
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
