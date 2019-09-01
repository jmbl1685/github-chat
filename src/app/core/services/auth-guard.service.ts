import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public afAuth: AngularFireAuth, public authSevice: AuthService) { }

  canActivate() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(async (user) => {
        if (user !== null) {
          const token = await user.getIdToken(true);
          const validate = token.length > 0 ? true : false;
          resolve(validate);
        } else {
          reject(false);
        }
      });
    });
  }


}

