import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../core/services/user.service';
import { ChatService } from '../core/services/chat.service';
import { ChatMessageComponent } from './chat-container/chat-message/chat-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatUsersComponent,
    ChatContainerComponent,
    ChatMessageComponent
  ],
  imports: [SharedModule, CommonModule, ChatRoutingModule],
  providers: [UserService, ChatService]
})
export class ChatModule {}
