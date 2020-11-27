import { Controller, Get, Req, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { VideoService } from 'services';
import * as fs from 'fs';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  videoStream(@Req() req: Request, @Res() res: Response): any {
    const range = req.headers.range; // What part of the video is the user watching?
    if (!range) {
      throw new BadRequestException('Requires Range Header');
    }

    const { videoPath, start, end, headers } = this.videoService.getVideoChunkById('', range);

    res.writeHead(HttpStatus.PARTIAL_CONTENT, headers);
    // create video read stream for this particular chunk
    const videoStream: string | fs.ReadStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  }
}
