// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, FirebaseService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}