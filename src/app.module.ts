import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from 'app.controller';
import { PlaybackModule } from './playback/playback.module';
import { Connection } from 'typeorm';
import { User } from 'users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'media',
      password: 'bDlLabh766ddw4c',
      database: 'media-server',
      entities: [User],
      synchronize: true // DEBUGGING ONLY
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
