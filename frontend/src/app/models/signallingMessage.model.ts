import { SignalData } from 'simple-peer';

export interface SignallingMessage {
    callerId?: string
    calleeId?: string,
    signalData?: SignalData,
   // msg?: string,
    username?: string,
    roomId?: string
  }