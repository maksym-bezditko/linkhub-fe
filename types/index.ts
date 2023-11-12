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

export type CheckForNicknameExistenceResponse = {
  checkForNicknameExistence: CommonResponse;
};

export type CreatePostResponse = {
  createPost: {
    id: string;
    caption: string;
    location: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type UpdateUserResponse = {
  updateUser: CommonResponse;
};

export type CreateUserResponse = {
  createUser: Tokens;
};

export type UserIdResponse = {
  userId: string;
};

export type Image = {
  name: string;
  url: string;
};

export type Sex = 'MALE' | 'FEMALE';

export type UserResponse = {
  getUserById: {
    id: string;
    bio: string;
    firstName: string;
    sex: Sex;
    lastName: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
