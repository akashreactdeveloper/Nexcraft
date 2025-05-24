import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firebaseUid!: string;

  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}
