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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}


// import { Injectable } from '@nestjs/common';

// export type User = any;

// @Injectable()
// export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme'
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess'
//     }
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(u => u.username === username);
//   }
// }
