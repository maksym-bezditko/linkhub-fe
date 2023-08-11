export type Comment = {
  senderId: string;
  text: string;
  likes: string;
};

export type Post = {
  id: string;
  userName: string;
  imageUrl: string;
  likes: number;
  caption: string;
  timestamp: number;
  comments?: Comment[];
  location?: string;
};

export type MenuSection = {
  title: string;
  onClick: () => void;
  icon: JSX.Element | null;
};

export type LoginWithEmail = {
  email: string;
  password: string;
};
