import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Yarn } from '@/types/yarn';

//input for a new yarn: everything except what the store fills in itself
export type NewYarn = Omit<Yarn, 'id' | 'archived' | 'createdAt'>;

interface YarnState {
    yarns: Yarn[];
    addYarn: (yarn: NewYarn) => void;
    deleteYarn: (id: string) => void;
    markAsUsed: (id: string) => void;
}

export const useYarnStore = create<YarnState>()(
    persist(
        (set) => ({
            yarns: [],

            addYarn: (yarn) =>
                set((state) => ({
                    yarns: [
                        { ...yarn, id: Date.now().toString(), archived: false, createdAt: new Date().toISOString() },
                        ...state.yarns,
                    ],
                })),

            deleteYarn: (id) =>
                set((state) => ({
                    yarns: state.yarns.filter((yarn) => yarn.id !== id),
                })),

            markAsUsed: (id) =>
                set((state) => ({
                    yarns: state.yarns.map((yarn) => (yarn.id === id ? { ...yarn, archived: true } : yarn)),
                })),
        }),
        {
            name: 'bundle-yarn',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);