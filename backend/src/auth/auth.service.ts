// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FirebaseService } from './firebase.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Prisma } from '@prisma/client';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
  ) {}

  async signup(token: string, name: string, email: string) {
    const decodedToken = await this.firebaseService.verifyToken(token);
    const firebaseUid = decodedToken.uid;

    const existingUser = await this.usersService.findByFirebaseUid(firebaseUid);
    if (existingUser) {
      return { user: existingUser, message: 'User already exists, logged in successfully' };
    }

    const createUserDto: CreateUserDto = { firebaseUid, name, email };
    try {
      const newUser = await this.usersService.create(createUserDto);
      return { user: newUser, message: 'User created successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  async login(token: string) {
    const decodedToken = await this.firebaseService.verifyToken(token);
    const firebaseUid = decodedToken.uid;

    const user = await this.usersService.findByFirebaseUid(firebaseUid);
    if (!user) {
      // Check if the login is via Google
      const isGoogleLogin = decodedToken.firebase?.sign_in_provider === 'google.com';
      if (isGoogleLogin) {
        // For Google login, automatically create the user
        const email = decodedToken.email || ''; // Firebase token should contain email
        const name = decodedToken.name || 'Google User'; // Use the name from the token, or a default
        const createUserDto: CreateUserDto = { firebaseUid, name, email };

        try {
          const newUser = await this.usersService.create(createUserDto);
          return { user: newUser, message: 'User created successfully via Google login' };
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Email already exists');
          }
          throw error;
        }
      } else {
        // For non-Google login (e.g., email/password), throw the error as before
        throw new Error('User not found. Please sign up first.');
      }
    }

    return { user, message: 'Login successful' };
  }
}