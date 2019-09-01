import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  chatMemberCollection = 'chat-members';
  chatMemberCollectionReferences = 'chat-members-references';

  constructor(private db: AngularFireDatabase) {}

  createUser(user: IUser): void {
    const reference = user.id.toString();
    this.db.list(`${this.chatMemberCollection}`).set(reference, user);
  }

  userConnectedStatus(user: IUser): void {
    const reference = user.id.toString();
    this.db.list(`${this.chatMemberCollection}`).set(reference, user);
  }

  updateUserConnectedStatus(reference: string, status: boolean): void {
    this.db
      .list(`${this.chatMemberCollection}/${reference}`)
      .set('status', status);
  }

  getUsers(): Promise<IUser[]> {
    return new Promise<IUser[]>(async (resolve, reject) => {
      try {
        const data = await this.db.database
          .ref(`${this.chatMemberCollection}`)
          .once('value');
        const users: any = Object.values(data.val()).map(user => user);
        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  userConnectedObservable(): AngularFireList<any> {
    return this.db.list(`${this.chatMemberCollection}`);
  }
}
