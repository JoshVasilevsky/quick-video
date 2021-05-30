import SimplePeer from 'simple-peer';

export interface Peer {
    peerId: string,
    username: string,
    peer?: SimplePeer.Instance
}