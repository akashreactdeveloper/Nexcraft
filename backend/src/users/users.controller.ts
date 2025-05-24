import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    // You can now use req.user safely if you're attaching it in the guard
    return this.usersService.findByFirebaseUid((req as any).user.uid);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
