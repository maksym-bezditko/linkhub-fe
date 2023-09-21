import { makeAutoObservable } from 'mobx';
import { Tokens } from '@/types';

class Store {
  accessToken: string | null = null;
  refreshToken: string | null = null;

  isFullscreenLoaderVisible = false;

  get isAuthenticated() {
    return Boolean(this.accessToken);
  }

  constructor() {
    makeAutoObservable(this);
  }

  setTokens(tokens: Tokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  setIsFullscreenLoaderVisible(visible: boolean) {
    this.isFullscreenLoaderVisible = visible;
  }
}

const store = new Store();

export { store };
