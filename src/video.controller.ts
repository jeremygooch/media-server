import { Controller, Get, Req, Res, HttpCode } from '@nestjs/common';
import * as fs from 'fs';

@Controller('video')
export class VideoController {
  @Get()
  videoStream(@Req() req, @Res() res): any {







    // @ts-ignore
    const range = req.headers.range; // What part of the video is the user watching?
    if (!range) {
    // @ts-ignore
      res.status(400).send("Requires Range header");
    }

    // get video stats (about 61MB)
    const videoPath = "/home/jrm3/src/media-server/dist/HouseOnSororityRow_HDmed.mp4";
    const videoSize = fs.statSync("/home/jrm3/src/media-server/dist/HouseOnSororityRow_HDmed.mp4").size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    // @ts-ignore
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);

    


    // return videoStream;
  }
}
