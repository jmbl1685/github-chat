import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
