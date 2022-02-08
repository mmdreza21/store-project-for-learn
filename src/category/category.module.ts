import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/Prisma.service';
import { CatProfile } from './dto/catProfile';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CatProfile],
})
export class CategoryModule {}
