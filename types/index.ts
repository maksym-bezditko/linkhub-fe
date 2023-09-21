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

export type LoginWithEmailResponse = {
  loginWithEmail: Tokens;
};

export type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type CommonResponse = {
  succeeded: boolean;
};

export type CheckForEmailExistenceResponse = {
  checkForEmailExistence: CommonResponse;
};

export type CheckForUsernameExistenceResponse = {
  checkForUsernameExistence: CommonResponse;
};

export type CreateUserResponse = {
  createUser: Tokens;
};
