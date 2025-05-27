// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async findByFirebaseUid(firebaseUid: string) {
    return this.usersRepository.findByFirebaseUid(firebaseUid);
  }
}