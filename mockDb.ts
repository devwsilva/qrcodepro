
import { UserSchema } from './types';

const DB_KEY = 'swapps_users_db';

// Simple "hash" function for simulation
const simulateHash = (pwd: string) => btoa(`salt_${pwd}_pepper`);

export const mockDb = {
  // Initialize DB with seed user if empty
  init: () => {
    const existing = localStorage.getItem(DB_KEY);
    if (!existing) {
      const seedUser: UserSchema = {
        id: 'user_001',
        name: 'Weslei de Menezes Silva',
        email: 'pr.wesleisilva@gmail.com',
        passwordHash: simulateHash('123456'),
        status: 'active',
        subscriptionExpiresAt: '2025-12-26T23:59:59Z',
        plan: 'pro',
        isLoggedIn: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(DB_KEY, JSON.stringify([seedUser]));
      console.log('Database initialized with seed user.');
    }
  },

  getUsers: (): UserSchema[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  },

  findUser: (email: string): UserSchema | undefined => {
    const users = mockDb.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  addUser: (userData: Partial<UserSchema> & { passwordHash: string }) => {
    const users = mockDb.getUsers();
    const newUser: UserSchema = {
      id: `user_${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      passwordHash: userData.passwordHash,
      status: 'active',
      subscriptionExpiresAt: null,
      plan: 'free',
      isLoggedIn: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    };
    users.push(newUser);
    localStorage.setItem(DB_KEY, JSON.stringify(users));
    return newUser;
  },

  updateUser: (id: string, updates: Partial<UserSchema>) => {
    const users = mockDb.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(DB_KEY, JSON.stringify(users));
      return users[index];
    }
    return null;
  }
};

export const authService = {
  login: (email: string, password: string): UserSchema | null => {
    const user = mockDb.findUser(email);
    if (user && user.passwordHash === simulateHash(password)) {
      return user;
    }
    return null;
  }
};
