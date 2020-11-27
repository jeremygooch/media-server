import { Controller, Get, Post, All } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    console.log('testtesttest');
    return 'this returns all cats!!';
  }

  @Get('name')
  getName(): string {
    return 'this returns a cat name Erika ;-P !!!!!';
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
