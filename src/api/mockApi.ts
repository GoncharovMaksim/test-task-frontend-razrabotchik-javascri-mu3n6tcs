import { LoginCredentials, User } from '../types/auth';
import { CardItem } from '../types/card';
import { ProfileData } from '../types/profile';
import { MOCK_CARDS, INITIAL_PROFILE_DATA } from './mockData';

const AUTH_STORAGE_KEY = 'agy_astral_auth_session';
const PROFILE_STORAGE_KEY = 'agy_astral_profile_data';
const CARDS_STORAGE_KEY = 'agy_astral_cards_data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthApi = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    await delay(350);

    const { login, password } = credentials;
    const cleanLogin = login.trim();
    const cleanPassword = password.trim();

    if (cleanLogin === 'admin' && cleanPassword === 'admin') {
      const user: User = {
        id: 'user-001',
        login: 'admin',
        name: 'Максим Смирнов',
        email: 'm.smirnov@astral.example.ru',
        role: 'Frontend Middle Developer',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      };
      const token = 'fake-jwt-token-astral-secret-' + Date.now();
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
      return { user, token };
    }

    throw new Error('Вход невозможен – неправильные логин или пароль');
  },

  async logout(): Promise<void> {
    await delay(150);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getCurrentSession(): { user: User; token: string } | null {
    try {
      const item = localStorage.getItem(AUTH_STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    return null;
  }
};

export const mockCardsApi = {
  async getCards(): Promise<CardItem[]> {
    await delay(250);
    const stored = localStorage.getItem(CARDS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback to default mock
      }
    }
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(MOCK_CARDS));
    return MOCK_CARDS;
  },

  async toggleLearned(cardId: string): Promise<CardItem[]> {
    await delay(150);
    const cards = await this.getCards();
    const updated = cards.map((c) =>
      c.id === cardId ? { ...c, isLearned: !c.isLearned } : c
    );
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};

export const mockProfileApi = {
  async getProfile(): Promise<ProfileData> {
    await delay(200);
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(INITIAL_PROFILE_DATA));
    return INITIAL_PROFILE_DATA;
  },

  async updateProfile(newData: ProfileData): Promise<ProfileData> {
    await delay(350);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newData));
    return newData;
  },

  async resetProfile(): Promise<ProfileData> {
    await delay(150);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(INITIAL_PROFILE_DATA));
    return INITIAL_PROFILE_DATA;
  }
};
