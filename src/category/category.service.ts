import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/Prisma.service';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly Prisma: PrismaService) {}
  async create(data: Prisma.CategoryCreateInput): Promise<CategoryEntity> {
    const cat = await this.Prisma.category.create({ data });
    return cat;
  }

  async findAll() {
    return this.Prisma.category.findMany();
  }

  async findOne(where: Prisma.CategoryWhereUniqueInput) {
    const cat = await this.Prisma.category.findUnique({ where });
    if (cat) throw new NotFoundException('category whit given id ENotFound ');
    return cat;
  }

  async update(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryCreateInput,
  ) {
    const cat = this.Prisma.category.update({ where, data });
    if (cat) throw new NotFoundException('category whit given id ENotFound ');
    return cat;
  }

  async remove(where: Prisma.CategoryWhereUniqueInput) {
    const cat = this.Prisma.category.delete({ where });
    if (cat) throw new NotFoundException('category whit given id ENotFound ');
    return cat;
  }
}
