import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

import { CategoryService } from './category.service';
import { CatDTO, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiSecurity('JWT-auth')
  @ApiBadRequestResponse({ description: 'use another title' })
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const cat = await this.categoryService.findOne({
      title: createCategoryDto.title,
    });
    if (cat) throw new BadRequestException('this category already exist');

    const newCat = await this.categoryService.create(createCategoryDto);
    return this.mapper.map(newCat, CatDTO, CategoryEntity);
  }

  @Get()
  async findAll() {
    const cat = await this.categoryService.findAll();
    return this.mapper.mapArray(cat, CatDTO, CategoryEntity);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ id });
  }

  @ApiSecurity('JWT-auth')
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const cat = await this.categoryService.update({ id }, updateCategoryDto);
    return this.mapper.map(cat, CatDTO, CategoryEntity);
  }

  @ApiSecurity('JWT-auth')
  @ApiNoContentResponse({ description: 'the category is successfully deleted' })
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<CategoryEntity> {
    const cat = await this.categoryService.remove({ id });
    return this.mapper.map(cat, CatDTO, CategoryEntity);
  }
}
