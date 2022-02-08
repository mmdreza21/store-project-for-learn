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
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiSecurity('JWT-auth')
  @ApiBadRequestResponse({ description: 'use an uther title' })
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const cat = await this.categoryService.findOne({
      title: createCategoryDto.title,
    });
    if (cat) throw new BadRequestException('this. category already exist');

    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ id });
  }

  @ApiSecurity('JWT-auth')
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoryService.update({ id }, updateCategoryDto);
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
    res.status(204);
    return this.categoryService.remove({ id });
  }
}
