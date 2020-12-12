import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.usersRepository.find({
      where: {
        username,
        isActive: true
      },
      take: 1
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async add(user: User): Promise<void> {
    await this.usersRepository.insert(user);
  }
}
