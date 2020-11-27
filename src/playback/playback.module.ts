import { Module } from '@nestjs/common';
import { PlaybackService } from './playback.service';
import { PlaybackController } from './playback.controller';

@Module({
  providers: [PlaybackService],
  controllers: [PlaybackController]
})
export class PlaybackModule {}
