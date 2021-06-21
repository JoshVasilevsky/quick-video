import { Peer } from "./peer.model";

export class Message {
    time: Date = new Date();
    text: string;
    user: Peer;
  }