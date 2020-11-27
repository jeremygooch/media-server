import { OutgoingHttpHeaders } from "http";

export interface PartialChunk {
  assetPath: string;
  chunkHeaders: OutgoingHttpHeaders;
  start: number;
  end: number;
};
