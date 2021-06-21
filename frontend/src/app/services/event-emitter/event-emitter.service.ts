import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../../models/message.model";
import { RoomSettings } from "../../models/room-settings.model";


@Injectable({providedIn: 'root'})
export class EventEmitterService {

    joinLeaveRoomEvent = new EventEmitter();
    disconnectEvent = new EventEmitter();
    toggleChatEvent = new EventEmitter();
    toggleMicEvent = new EventEmitter();
    toggleCameraEvent = new EventEmitter();
    toggleShareScreenEvent = new EventEmitter();
    sendMessageEvent = new EventEmitter();


    emitJoinLeaveRoomEvent(roomJoinSettings: RoomSettings):void{
        this.joinLeaveRoomEvent.emit(roomJoinSettings);
    }

    getJoinLeaveRoomEvent(): Observable<RoomSettings>{
        return this.joinLeaveRoomEvent.asObservable();
    }
    
    emitDisconnectEvent():void{
        this.disconnectEvent.emit();
    }

    getDisconnectEvent(): Observable<void>{
        return this.disconnectEvent.asObservable();
    }

    emitToggleChatEvent(isChatOpen: boolean):void{
        this.toggleChatEvent.emit(isChatOpen);
    }

    getToggleChatEvent(): Observable<boolean>{
        return this.toggleChatEvent.asObservable();
    }

    emitToggleMicEvent(isAudioEnabled: boolean):void{
        this.toggleMicEvent.emit(isAudioEnabled);
    }

    getToggleMicEvent(): Observable<boolean>{
        return this.toggleMicEvent.asObservable();
    }

    emitToggleCameraEvent(isCameraEnabled: boolean):void{
        this.toggleCameraEvent.emit(isCameraEnabled);
    }

    getToggleCameraEvent(): Observable<boolean>{
        return this.toggleCameraEvent.asObservable();
    }

    emitToggleShareScreenEvent(isSharingScreen: boolean):void{
        this.toggleShareScreenEvent.emit(isSharingScreen);
    }

    getToggleShareScreenEvent(): Observable<boolean>{
        return this.toggleShareScreenEvent.asObservable();
    }

    emitSendMessageEvent(message: Message):void{
        this.sendMessageEvent.emit(message);
    }

    getSendMessageEvent(): Observable<Message>{
        return this.sendMessageEvent.asObservable();
    }

}