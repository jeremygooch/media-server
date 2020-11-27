import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from 'services';
import { HeaderRangePipe } from 'pipes';
import { CustomHeaders } from 'decorators';
import * as fs from 'fs';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  videoStream(@Res() res: Response, @CustomHeaders('range', HeaderRangePipe) range): any {
    const { videoPath, start, end, chunkHeaders } = this.videoService.getVideoChunkById('', range);

    res.writeHead(HttpStatus.PARTIAL_CONTENT, chunkHeaders);
    // create video read stream for this particular chunk
    const videoStream: string | fs.ReadStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  }
}
