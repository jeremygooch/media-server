import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PlaybackService } from './playback.service';
import { HeaderRangePipe } from 'pipes';
import { CustomHeaders } from 'decorators';
import * as fs from 'fs';
// import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('playback')
export class PlaybackController {
  constructor(private playbackService: PlaybackService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  stream(@Res() res: Response, @CustomHeaders('range', HeaderRangePipe) range: string): void {
    const {
      assetPath,
      start,
      end,
      chunkHeaders
    } = this.playbackService.getAssetChunkById('', range);

    res.writeHead(HttpStatus.PARTIAL_CONTENT, chunkHeaders);
    const stream: string | fs.ReadStream = fs.createReadStream(assetPath, { start, end });
    stream.pipe(res);
  }
}
