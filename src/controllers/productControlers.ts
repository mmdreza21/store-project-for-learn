import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/models/user/userModel';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { RolesGuard } from 'src/utils/auth/role.guard';
import { Roles } from 'src/utils/auth/roles.decorator';

@ApiTags('products')
@Controller('product')
export class ProductController {
  @Post()
  @Roles(Role.AdminOfSite)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({ description: 'this gonna return a prod if it`s success' })
  @ApiForbiddenResponse({
    description: 'your role have to be admin for creating product',
  })
  @ApiBadRequestResponse({
    description: 'user productDTO down blow to get 200 ',
  })
  @ApiSecurity('JWT-auth')
  async createOne(@Body() prod: string) {
    return prod;
  }

  @Get()
  async getOne() {}
}
