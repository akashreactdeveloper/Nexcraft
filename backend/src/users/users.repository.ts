// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import based on your PrismaService location
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client'; // Prisma generates this type based on your schema.prisma

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        firebaseUid: dto.firebaseUid,
        email: dto.email,
        name: dto.name,
      },
    });
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { firebaseUid },
    });
  }
}