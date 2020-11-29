import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from 'app.controller';
import { PlaybackModule } from './playback/playback.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      'type': 'mysql',
      'host': 'db',
      'port': 3306,
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'database': process.env.DB_DATABASE_NAME,
      'synchronize': true, // DEVELOPMENT ONLY
      'entities': ['dist/**/*.entity{.ts,.js}']
    }),
    AuthModule,
    UsersModule,
    PlaybackModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
