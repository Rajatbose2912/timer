import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HackathonState {
  endDate: string;
  setEndDate: (date: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = 'd7&8:4K60/p3'; // In a real app, this should be stored securely

export const useHackathonStore = create<HackathonState>()(
  persist(
    (set) => ({
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default 7 days from now
      setEndDate: (date) => set({ endDate: date }),
      isAuthenticated: false,
      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'hackathon-storage',
    }
  )
);