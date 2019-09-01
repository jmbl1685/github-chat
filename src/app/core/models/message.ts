export interface IMessage {
  message: string;
  file?: IFileMessage;
  createdAt: string;
  user: IUserMessage;
}

interface IUserMessage {
  id: number;
  name: string;
  avatar: string;
}

interface IFileMessage {
  type: string;
  fileName: string;
  url: string;
}
