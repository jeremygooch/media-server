import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { VideoController } from './video.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, VideoController],
  providers: [AppService],
})
export class AppModule {}
