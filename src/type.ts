interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  communities: string[];
  events: string[];
}

interface Community {
  _id: string;
  name: string;
  description: string;
  img: string;
  members?: number;
}

interface Post {
  _id: string;
  message: string;
  userId: string;
  communityId: string;
  dateCreated: Date;
  username: string;
}

interface EventType {
  _id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  group: string;
  organiser: string;
}

export type { User, Community, Post, EventType };
