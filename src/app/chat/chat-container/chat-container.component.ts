import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  AngularFireUploadTask,
  AngularFireStorage
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IUser } from 'src/app/core/models/user';
import { IMessage } from 'src/app/core/models/message';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {
  loading: boolean;

  uploadFileStatus: boolean;
  showEmojiPicker: boolean;
  scrolltop: any;

  loadingMessage: string;
  messageIndicatorMessage: string;

  user: IUser;
  userTyping: IUser;

  messages: any[];
  message: FormControl;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  fileSizeLimit: number;
  uploadFileMessage: string;
  uploadFileExceededMessage: string;

  @ViewChild('chatContainer', { static: true })
  chatContainer: ElementRef<HTMLElement>;

  @ViewChild('inputFile', { static: true })
  inputFile: ElementRef<HTMLElement>;

  constructor(
    private chatService: ChatService,
    private storage: AngularFireStorage
  ) {
    this.loadingMessage = 'Loading messages...';
    this.messageIndicatorMessage = 'No message currently. Be the first!!';
    this.uploadFileMessage = 'Uploading file, please wait...';
    this.uploadFileExceededMessage =
      'You have exceeded the allowed limit (5.12MB)';
    this.loading = false;
    this.messages = [];
    this.uploadFileStatus = false;
    this.showEmojiPicker = false;
    this.scrolltop = null;
    this.fileSizeLimit = 5367159; // 5.12MB
    this.message = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.checkUser();
    this.getMessages();
    this.isTypingObservable();
    this.valuesChangesDebounceTime();
  }

  ngOnDestroy() {
    this.isTypingChangeStatus(false);
  }

  valuesChangesDebounceTime() {
    this.message.valueChanges.pipe(debounceTime(200)).subscribe(res => {
      this.isTypingChangeStatus(false);
    });
  }

  scrollHandler(event) {
    const scrollTop = event.target.scrollTop;
    if (scrollTop <= 5) {
      const lastKey = this.messages[0].key;
      this.getMessagesByLastKey(lastKey);
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    const text = `${this.message.value}${event.emoji.native}`;
    this.message.setValue(text);
    this.showEmojiPicker = false;
  }

  getMessagesByLastKey(lastKey: string) {
    this.loading = true;
    this.chatService
      .getMessagesByLastKey(this.messages.length, lastKey)
      .then(res => {
        const data = res.data;
        if (data.length !== 1) {
          this.messages.unshift(...data);
          this.scrolltop = 200;
        }
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
      });
  }

  messagesObservable() {
    this.chatService
      .messagesObservable()
      .snapshotChanges()
      .subscribe(res => this.pushChatMessages(res));
  }

  pushChatMessages(messages: any[]) {
    const data: IMessage[] = messages.map(c => {
      const result = {
        key: c.payload.key,
        ...c.payload.val()
      };
      return result;
    });
    this.messages.push(...data);
    if (data.length > 0) {
      this.scrolltop = Math.pow(
        this.chatContainer.nativeElement.scrollHeight,
        2
      );
    }
  }

  getMessages(): Promise<IMessage[]> {
    return new Promise<IMessage[]>(async (resolve, reject) => {
      try {
        this.loading = true;
        const response = await this.chatService.getMessages();
        if (response) {
          this.messages = response.data;
          this.loading = false;
          this.messagesObservable();
        }
        resolve(response);
      } catch (err) {
        this.loading = false;
        reject(err);
      }
    });
  }

  createMessage(event): void {
    const message = event.target.value;

    if (this.messageIsValid(message)) {
      const createdAt = new Date().toISOString();

      const user = {
        id: this.user.id,
        name: this.user.name,
        avatar: this.user.avatar_url
      };

      this.chatService.createMessage({ createdAt, message, user });
      event.target.value = null;
      this.message.setValue('');
    }
  }

  messageIsValid(message): boolean {
    return message.trim().length > 0;
  }

  checkUser(): void {
    const info = localStorage.getItem('userInfo');
    this.user = info ? JSON.parse(info) : null;
  }

  clickInputFile(): void {
    this.inputFile.nativeElement.click();
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    const index = files.length;
    if (index > 0) {
      const fileSize = files.item(0).size;
      if (fileSize <= this.fileSizeLimit) {
        this.startUpload(files);
        return;
      }
      alert(this.uploadFileExceededMessage);
    }
  }

  startUpload(event: FileList): void {
    this.uploadFileStatus = true;

    const file = event.item(0);
    const firebaseFolder = 'chat-files';
    const fileName = `${new Date().getTime()}_${file.name.toLocaleLowerCase()}`;
    const path = `${firebaseFolder}/${fileName}`;

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    this.task.then(async res => {
      const url = await res.ref.getDownloadURL();

      const createdAt = new Date().toISOString();

      const user = {
        id: this.user.id,
        name: this.user.name,
        avatar: this.user.avatar_url
      };

      const fileInfo = {
        type: file.type,
        fileName,
        url
      };

      this.chatService.createMessage({
        createdAt,
        message: '',
        user,
        file: fileInfo
      });

      this.uploadFileStatus = false;
    });
  }

  isTypingChangeStatus(status: boolean): void {
    const reference = this.user.id.toString();
    this.chatService.isTyping(reference, status);
  }

  typing(event): void {
    const keys = 'cvxspwuaz';
    const validation = event.key.trim().length === 1;
    this.typingCases(event, keys, validation);
  }

  typingCases(event: any, keys: string, validation: boolean): void {
    if (validation) {
      this.isTypingChangeStatus(true);
    }
    if (event.ctrlKey && keys.indexOf(event.key) !== -1) {
      this.isTypingChangeStatus(false);
    }
  }

  resetTyping(event: void): void {
    this.isTypingChangeStatus(false);
  }

  isTypingObservable(): void {
    this.chatService
      .isTypingObservable()
      .stateChanges(['child_changed'])
      .subscribe(res => {
        const user: IUser = res.payload.val();
        this.userTyping = user.typing ? user : null;
      });
  }
}
