import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'users/user.entity';

const salt = process.env.SALT;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    const hashedPW = await bcrypt.hash(pass, salt);

    // TODO: Switch to bcrypt compare method. Currently running into
    // the following issue:
    //
    // const a = await bcrypt.hash('a', salt); // <- $2a...DmJi.
    // const b = await bcrypt.hash('a', salt); // <- $2a...DmJi.
    // const match = await bcrypt.compare(a, b); // <- false
    if (user[0] && user[0].password === hashedPW) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async createUser(user: User): Promise<any> {
    if ((await this.usersService.findByUsername(user.username) || []).length) {
      throw new HttpException('Username already exists.', HttpStatus.CONFLICT);
    } else {
      await this.usersService.add({
        ...user,
        password: await bcrypt.hash(user.password, salt),
        isActive: true
      });
      return { created: true };
    }
  }
}
