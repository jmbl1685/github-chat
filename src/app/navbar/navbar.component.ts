import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: IUser;
  status: boolean;
  title: string;
  buttonTitle: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.status = false;
    this.title = 'Chat for GitHub Developers';
    this.buttonTitle = 'Sign In With GitHub';
    this.checkUser();
  }

  ngOnInit(): void {
    this.updateUserConnectedStatus(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  changeUserStatus($event): void {
    this.updateUserConnectedStatus(false);
  }

  updateUserConnectedStatus(status: boolean): void {
    if (this.user) {
      this.userService.updateUserConnectedStatus(
        this.user.id.toString(),
        status
      );
    }
  }

  githubLogin() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await this.authService.githubLogin();
        this.user = response.additionalUserInfo.profile;
        this.status = true;
        this.user.status = this.status;
        this.user.typing = false;
        localStorage.setItem('userInfo', JSON.stringify(this.user));
        this.router.navigateByUrl('/chat');
        this.userService.createUser(this.user);
        resolve(this.user);
      } catch (err) {
        reject(err);
      }
    });
  }

  checkUser() {
    const info = localStorage.getItem('userInfo');
    if (info) {
      this.user = JSON.parse(info);
      this.status = true;
      this.user.status = this.status;
      this.user.typing = false;
      this.router.navigateByUrl('/chat');
    }
  }

  logout() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await this.authService.logout();
        if (response) {
          this.status = false;
          this.updateUserConnectedStatus(false);
          localStorage.removeItem('userInfo');
          this.router.navigateByUrl('/');
        }
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}
