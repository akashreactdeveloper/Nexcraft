import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  firebaseUid!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}
