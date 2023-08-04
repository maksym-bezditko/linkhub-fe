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
