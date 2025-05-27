// src/auth/auth.controller.ts
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Headers('authorization') token: string,
    @Body('name') name: string,
    @Body('email') email: string,
  ) {
    if (!token) {
      throw new Error('Firebase token is required');
    }
    const firebaseToken = token.replace('Bearer ', '');
    return this.authService.signup(firebaseToken, name, email);
  }

  @Post('login')
  async login(@Headers('authorization') token: string) {
    if (!token) {
      throw new Error('Firebase token is required');
    }
    const firebaseToken = token.replace('Bearer ', '');
    return this.authService.login(firebaseToken);
  }
}