import { Controller, Request, Body, Post, Get, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { User } from 'users/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/create-user')
  async createUser(@Body() user: User) {
      return this.authService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
