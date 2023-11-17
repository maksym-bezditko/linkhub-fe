'use client';

import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Tokens, UserResponse } from '@/types';

class Store {
  accessToken: string | null = null;
  refreshToken: string | null = null;

  profile: UserResponse['getUserById'] | null = null;

  isFullscreenLoaderVisible = false;

  get isAuthenticated() {
    return Boolean(this.accessToken);
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'Store',
      properties: [
        'accessToken',
        'refreshToken',
        'isFullscreenLoaderVisible',
        'profile',
      ],
      storage: window.localStorage,
    });
  }

  setTokens(tokens: Tokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  setProfile(userResponse: UserResponse | null) {
    this.profile = userResponse?.getUserById ?? null;
  }

  setIsFullscreenLoaderVisible(visible: boolean) {
    this.isFullscreenLoaderVisible = visible;
  }
}

const store = new Store();

export { store };
