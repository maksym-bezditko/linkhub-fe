import { v4 as uuidv4 } from 'uuid';
import { Post } from '@/types';

export const MOCK_POSTS: Post[] = [
  {
    id: uuidv4(),
    caption: 'What can be better than this?',
    userName: 'Angelina Misurenko',
    imageUrl:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    likes: 9,
    timestamp: new Date().getTime(),
    location: 'Kharkiv, Ukraine',
  },

  {
    id: uuidv4(),
    caption: 'What can be better than this?',
    userName: 'Angelina Misurenko',
    imageUrl:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    likes: 9,
    timestamp: new Date().getTime(),
    location: 'Kharkiv, Ukraine',
  },

  {
    id: uuidv4(),
    caption: 'What can be better than this?',
    userName: 'Angelina Misurenko',
    imageUrl:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    likes: 9,
    timestamp: new Date().getTime(),
    location: 'Kharkiv, Ukraine',
  },
];
