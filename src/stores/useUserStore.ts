import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: number;
  medical_code: string;
  name: string;
  role: 'doctor' | 'nurse' | 'administrator';
  department: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (medicalCode: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  login: async (medicalCode: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('medical_code', medicalCode)
        .eq('status', 'active')
        .single();

      if (error) throw new Error('Invalid medical code');
      if (!data) throw new Error('User not found or inactive');

      set({ currentUser: data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Authentication failed', 
        loading: false 
      });
      throw error;
    }
  },

  logout: () => {
    set({ currentUser: null });
  },

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ users: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch users', 
        loading: false 
      });
    }
  }
}));