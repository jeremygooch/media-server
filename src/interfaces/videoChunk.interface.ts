import { OutgoingHttpHeaders } from "http";

export interface VideoChunk {
  videoPath: string;
  chunkHeaders: OutgoingHttpHeaders;
  start: number;
  end: number;
};
