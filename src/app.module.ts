import { Module } from '@nestjs/common';
import { VideoController } from 'controllers';
import { VideoService } from 'services';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from 'app.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, VideoController],
  providers: [VideoService],
})
export class AppModule {}
