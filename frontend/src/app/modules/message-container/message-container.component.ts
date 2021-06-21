
import { Component, Input, OnInit} from '@angular/core';
import { Peer as userPeer } from '../../models/peer.model';
import { Message } from '../../models/message.model';

@Component({
  selector: 'message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit{

  @Input() message: Message
  @Input() currentUser: userPeer;

  isMessageFromCurrentUser : boolean = false;
  
  constructor(){}
  
  ngOnInit(): void {
    this.isMessageFromCurrentUser = (this.message.user.peerId === this.currentUser.peerId);
  }

}
