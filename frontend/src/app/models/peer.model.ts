import Peer from "simple-peer";

export interface Peer {
    peerId: string,
    username: string,
    peer?: Peer.Instance
}