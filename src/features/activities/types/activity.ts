type EventType =
  | "academic"
  | "cultural_festive"
  | "sports"
  | "technical"
  | "social_awareness"
  | "alumni_networking"
  | "fun_informal";

interface IApiRes {
  success: boolean;
  message: string;
}

export interface IEventBody {
  title: string;
  date: string;
  time: string;
  place: string;
  type: EventType;

  url?: string | undefined;
  avatar?: string | undefined;
}

export interface IEvent {
  title: string;
  date: string;
  time: string;
  place: string;
  url: string | null;
  avatar: string | null;
  type: EventType;
  id: string;
  collageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventCreateRes extends IApiRes {
  newEvent: IEvent;
}

export interface IEventsRes extends IApiRes {
  events: IEvent[];
}
