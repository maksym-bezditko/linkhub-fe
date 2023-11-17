export type Comment = {
  senderId: string;
  text: string;
  likes: string;
};

export type PostResponsePost = {
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
    caption: string;
    id: string;
    likes: LikeResponse[];
    location: string;
    postImages: PostImageResponse[];
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

export type Follow = {
  followedUserId: string;
  followingUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type PostOwnerResponse = {
  id: string;
  nickname: string;
};

export type PostResponse = {
  id: string;
  caption: string;
  location: string;
  user: PostOwnerResponse;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  bio: string;
  firstName: string;
  sex: Sex;
  lastName: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  followedBy: Follow[];
  following: Follow[];
  posts: PostResponse[];
};

export type UserResponse = {
  getUserById: User;
};

export type UserRecommendationsResponse = {
  getRecommendations: User[];
};

export type FriendsPostsResponse = {
  getFriendsPosts: PostWithImagesAndLikesResponse[];
};

export type PostsRecommendationsResponse = {
  getPostsRecommendations: PostWithImagesAndLikesResponse[];
};

export type PostImageResponse = {
  url: string;
};

export type LikeResponse = {
  userId: string;
};

export type PostWithImagesAndLikesResponse = PostResponse & {
  postImages: PostImageResponse[];
  likes: LikeResponse[];
};

export type PostsResponse = {
  getUserPosts: PostResponse[];
};

export type PostsWithImageAndLikesResponse = {
  getUserPosts: PostWithImagesAndLikesResponse[];
};

export type SearchUsersResponse = {
  searchUsers: User[];
};

export type DeletePostResponse = {
  deletePost: CommonResponse;
};

export enum SearchBy {
  NICKNAME = 'nickname',
  FULLNAME = 'fullname',
}

export enum SortBy {
  FULLNAME = 'fullname',
  DATE_OF_ACCOUNT_CREATION = 'dateOfAccountCreation',
}

export enum SexFilter {
  ALL = 'all',
  MALES = 'males',
  FEMALES = 'females',
}

export type UserFilters = {
  searchBy: SearchBy;
  sortBy: SortBy;
  searchText: string;
  sex: SexFilter;
  withPostsOnly: boolean;
};
