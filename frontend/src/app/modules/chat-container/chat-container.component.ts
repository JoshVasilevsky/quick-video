
import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Peer as userPeer } from '../../models/peer.model';
import { Message } from '../../models/message.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';

@Component({
  selector: 'chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent{

  @Input() messages: Message[];
  @Input() currentUser: userPeer;

  constructor(private eventEmitterService: EventEmitterService){}

  closeChat(){
    this.eventEmitterService.emitToggleChatEvent(false)
  }
}
