import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from 'app.controller';
import { PlaybackModule } from './playback/playback.module';

@Module({
  imports: [AuthModule, UsersModule, PlaybackModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
