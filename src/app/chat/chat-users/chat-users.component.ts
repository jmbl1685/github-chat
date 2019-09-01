import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {
  loading: boolean;
  users: IUser[];
  loadingMessage: string;
  title: string;

  constructor(private userService: UserService, private router: Router) {
    this.loading = false;
    this.users = [];
    this.loadingMessage = 'Loading users...';
    this.title = 'Users';
  }

  ngOnInit() {
    this.getUsers();
    this.userConnectedObservable();
  }

  gitHubProfile(user: IUser) {
    window.open(user.html_url, '_blank');
  }

  getUsers() {
    this.loading = true;
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await this.userService.getUsers();
        this.users = response;
        this.loading = false;
        resolve(this.users);
      } catch (err) {
        this.loading = false;
        reject(err);
      }
    });
  }

  userConnectedObservable() {
    this.userService
      .userConnectedObservable()
      .stateChanges(['child_changed'])
      .subscribe(res => {
        const user: IUser = res.payload.val();

        this.users.forEach(data => {
          if (data.id === user.id) {
            data.status = user.status;
          }
        });
      });
  }
}
