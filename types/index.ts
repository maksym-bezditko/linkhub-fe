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
  icon: JSX.Element | null;
  shouldAppear: boolean;
  href?: string;
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

export type UserIdResponse = {
  userId: string;
};

export type Image = {
  imageId: string;
  name: string;
  url: string;
};

export type Gender = 'MALE' | 'FEMALE' | 'TRANS' | 'NON-BINARY';

export type ProfileResponse = {
  getProfile: {
    id: string;
    userId: string;
    bio: string;
    firstName: string;
    gender: Gender;
    lastName: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
