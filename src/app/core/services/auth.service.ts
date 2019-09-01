import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth as firebaseAuth } from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  githubLogin() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const provider = new firebaseAuth.GithubAuthProvider();
        const response = await this.afAuth.auth.signInWithPopup(provider);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  facebookLogin() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const provider = new firebaseAuth.FacebookAuthProvider();
        const response = await this.afAuth.auth.signInWithPopup(provider);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  twitterLogin() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const provider = new firebaseAuth.TwitterAuthProvider();
        const response = await this.afAuth.auth.signInWithPopup(provider);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  googleLogin() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const provider = new firebaseAuth.GoogleAuthProvider();
        const response = await this.afAuth.auth.signInWithPopup(provider);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebaseAuth().currentUser) {
        this.afAuth.auth.signOut();
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
