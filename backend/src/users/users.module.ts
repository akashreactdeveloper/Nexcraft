// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository'; // Import the repository
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository], // Add UsersRepository as a provider
  exports: [UsersService],
})
export class UsersModule {}