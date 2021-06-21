
import { Component, Input} from '@angular/core';
import { Peer as userPeer } from '../../models/peer.model';
import { Message } from '../../models/message.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent{

  @Input() currentUser: userPeer;

  sendingMessage: string = "";
  allowEnterSend: boolean = true;

  constructor(private eventEmitterService: EventEmitterService){}
 
 sendMessage(){
    this.sendingMessage = this.sendingMessage.trim()
    if(this.sendingMessage){
      const message: Message = new Message()
      message.user = this.currentUser;
      message.text = this.sendingMessage;
      this.eventEmitterService.emitSendMessageEvent(message);
      this.sendingMessage = undefined;
   }
  }

  toggleEnter(value: boolean){
    this.allowEnterSend = value;
  }

  enterSendMessage(){
    if(!!this.sendingMessage.trim() && this.allowEnterSend){
      this.sendMessage();
    }
  }

 
}
