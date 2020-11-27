import { OutgoingHttpHeaders } from "http";

export interface VideoChunk {
  videoPath: string;
  headers: OutgoingHttpHeaders;
  start: number;
  end: number;
};
