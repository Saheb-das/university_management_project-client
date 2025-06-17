interface IApiRes {
  success: boolean;
  message: string;
}

export interface IMessage {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;

  sender: {
    firstName: string;
    lastName: string;
    id: string;
    profile: {
      avatar: string | null;
    };
  };
}

export interface IConversation {
  id: string;
  name: string;
  collageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatQueryByConvName {
  conName: string;
  lastMsgId?: string;
  limit?: string;
}

export interface IChatsByConvNameRes extends IApiRes {
  chats: IMessage[];
}

export interface IConversationRes extends IApiRes {
  conversation: IConversation;
}
