interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  communities: string[];
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
}

export type { User, Community, Post };
