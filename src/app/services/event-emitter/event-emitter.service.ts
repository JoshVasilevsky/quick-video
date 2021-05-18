import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { RoomJoinSettings } from "../../models/roomJoinSettings.model";


@Injectable({providedIn: 'root'})
export class EventEmitterService {
    joinRoomEvent = new EventEmitter();

    emitJoinRoomEvent(roomJoinSettings: RoomJoinSettings):void{
        this.joinRoomEvent.emit(roomJoinSettings);
    }

    getJoinRoomEvent(): Observable<RoomJoinSettings>{
        return this.joinRoomEvent.asObservable();
    }

}