import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/core/models/message';
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  user: IUser;
  @Input() messages: Array<IMessage>;

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    const info = localStorage.getItem('userInfo');
    this.user = info ? JSON.parse(info) : null;
  }

  openImg(url: string) {
    window.open(url);
  }
}
