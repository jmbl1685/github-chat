import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IMessage } from '../models/message';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessagesCollection = environment.collectionsName.chatMessagesCollection;
  chatMembersCollection = environment.collectionsName.chatMemberCollection;

  constructor(private db: AngularFireDatabase) {}

  createMessage(message: IMessage): void {
    const id = this.db.createPushId();
    this.db.database.ref(`${this.chatMessagesCollection}/${id}`).set(message);
  }

  getMessagesByLastKey(numberItems: number, lastKey: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await this.db.database
          .ref(this.chatMessagesCollection)
          .orderByKey()
          .endAt(lastKey)
          .limitToLast(numberItems + 1)
          .once('value');

        const response: any[] = data.val();
        const keysList = Array.from(Object.keys(response));
        const lastKeyReturned = keysList[keysList.length - 1];

        const messages = Object.values(response).map((obj, i) => {
          return {
            key: Object.keys(response)[i],
            ...obj
          };
        });

        messages.pop();

        resolve({ data: messages, lastKey: lastKeyReturned });
      } catch (err) {
        reject(err);
      }
    });
  }

  getMessages(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const data = await this.db.database
          .ref(this.chatMessagesCollection)
          .limitToLast(10)
          .once('value');

        const response: any[] = data.val();
        let lastKeyReturned = null;
        let messages = [];

        if (response !== null) {
          const keysList = Array.from(Object.keys(response));
          lastKeyReturned = keysList[keysList.length - 1];

          messages = Object.values(response).map((obj, i) => {
            return {
              key: Object.keys(response)[i],
              ...obj
            };
          });

          messages.pop();
        }

        resolve({ data: messages, lastKey: lastKeyReturned });
      } catch (err) {
        reject(err);
      }
    });
  }

  isTyping(reference: string, status: boolean): void {
    this.db
      .list(`${this.chatMembersCollection}/${reference}`)
      .set('typing', status);
  }

  isTypingObservable(): AngularFireList<any> {
    return this.db.list(`${this.chatMembersCollection}`);
  }

  messagesObservable(): AngularFireList<any> {
    return this.db.list(this.chatMessagesCollection, res => res.limitToLast(1));
  }
}
