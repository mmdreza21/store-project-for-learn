import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/models/user/userDTO';
import { AuthService } from 'src/services/authService';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';

@ApiTags('LoginStuff')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Post()
  // login(@Body() req: LoginDto): Promise<{ accessToken: string }> {
  //   return this.authService.LoginDto(req);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiSecurity('JWT-auth')
  // @Get('login')
  // async user(@Request() req) {
  //   return req.user;
  // }
}
