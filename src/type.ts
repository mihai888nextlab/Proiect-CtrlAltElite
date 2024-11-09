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
}

export type { User, Community };
