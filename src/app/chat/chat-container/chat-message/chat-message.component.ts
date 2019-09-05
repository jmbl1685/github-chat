import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/core/models/message';
import { IUser } from 'src/app/core/models/user';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  user: IUser;
  @Input() messages: Array<IMessage>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const info = localStorage.getItem('userInfo');
    this.user = info ? JSON.parse(info) : null;
  }

  openImg(url: string) {
    this.eventService.emit('OPEN_IMAGE_MODAL', { imgUrl: url });
  }

  formatText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
  }
}
