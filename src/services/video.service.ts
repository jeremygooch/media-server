import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { OutgoingHttpHeaders } from 'http';
import { VideoChunk } from 'interfaces/videoChunk.interface';

@Injectable()
export class VideoService {
  private getVideoPathById(id: string): string {
    return '/home/jrm3/src/media-server/dist/HouseOnSororityRow_HDmed.mp4';
  }

  getVideoChunkById(id: string, range: string): VideoChunk {
    const videoPath: string = this.getVideoPathById(id);
    const videoSize: number = fs.statSync(videoPath).size;

    const CHUNK_SIZE: number = 10 ** 6; // 1MB
    const start: number = Number(range.replace(/\D/g, "")); // Example range: "bytes=32324-"
    const end: number = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength: number = end - start + 1;
    const chunkHeaders: OutgoingHttpHeaders = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    return { videoPath, chunkHeaders, start, end };
  }
}
