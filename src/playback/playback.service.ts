import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { OutgoingHttpHeaders } from 'http';
import { PartialChunk } from 'interfaces';

@Injectable()
export class PlaybackService {
  private getAssetPathById(id: string): string {
    return '/library/HouseOnSororityRow_HDmed.mp4';
  }

  getAssetChunkById(id: string, range: string): PartialChunk {
    const assetPath: string = this.getAssetPathById(id);
    const assetSize: number = fs.statSync(assetPath).size;

    const CHUNK_SIZE: number = 10 ** 6; // 1MB
    const start: number = Number(range.replace(/\D/g, '')); // Example range: "bytes=123456-"
    const end: number = Math.min(start + CHUNK_SIZE, assetSize - 1);
    const contentLength: number = end - start + 1;

    const chunkHeaders: OutgoingHttpHeaders = {
      "Content-Range": `bytes ${start}-${end}/${assetSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    return { assetPath, chunkHeaders, start, end };
  }
}
