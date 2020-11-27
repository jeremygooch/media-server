import { Module } from '@nestjs/common';
import {AppController, CatsController, VideoController} from 'controllers';
import { AppService } from 'services';

@Module({
  imports: [],
  controllers: [AppController, CatsController, VideoController],
  providers: [AppService],
})
export class AppModule {}
