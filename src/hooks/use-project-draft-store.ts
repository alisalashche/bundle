import { router } from 'expo-router';
import { create } from 'zustand';
import type { Craft, Difficulty, ProjectStep, AssignedYarn } from '@/types/project';

export type ProjectDraft = {
    name: string;
    craft: Craft;
    difficulty: Difficulty;
    hookNeedleSize: string;
    stitches: string;
    tutorialUrl: string;
    yarn: AssignedYarn[];
    steps: ProjectStep[];
    notes: string;
    referencePhotos: string[];
};

const emptyDraft: ProjectDraft = {
    name: '',
    craft: 'knitting',
    difficulty: 'normal',
    hookNeedleSize: '',
    stitches: '',
    tutorialUrl: '',
    yarn: [],
    steps: [],
    notes: '',
    referencePhotos: [],
};

export type WizardStep = 1 | 2 | 3 | 4;

interface DraftState {
    step: WizardStep;
    draft: ProjectDraft;
    goTo: (step: WizardStep) => void;
    setField: <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) => void;
    toggleYarn: (yarnId: string) => void;
    setYarnQuantity: (yarnId: string, quantity: number) => void;
    addStep: (step: Omit<ProjectStep, 'id' | 'done'>) => void;
    updateStep: (id: string, changes: Omit<ProjectStep, 'id' | 'done'>) => void;
    removeStep: (id: string) => void;
    reset: () => void;
}

export const useProjectDraftStore = create<DraftState>()((set) => ({
    step: 1,
    draft: emptyDraft,

    goTo: (step) => set({ step }),

    setField: (key, value) => set((state) => ({ draft: { ...state.draft, [key]: value } })),

    toggleYarn: (yarnId) =>
        set((state) => {
            const isAssigned = state.draft.yarn.some((item) => item.yarnId === yarnId);
            const yarn = isAssigned
                ? state.draft.yarn.filter((item) => item.yarnId !== yarnId)
                : [...state.draft.yarn, { yarnId, quantity: 1 }];
            return { draft: { ...state.draft, yarn } };
        }),

    setYarnQuantity: (yarnId, quantity) =>
        set((state) => ({
            draft: {
                ...state.draft,
                yarn: state.draft.yarn.map((item) => (item.yarnId === yarnId ? { ...item, quantity } : item)),
            },
        })),

    addStep: (step) =>
        set((state) => ({
            draft: {
                ...state.draft,
                steps: [...state.draft.steps, { ...step, id: Date.now().toString(), done: false }],
            },
        })),
    
    updateStep: (id, changes) =>
        set((state) => ({
            draft: {
                ...state.draft,
                steps: state.draft.steps.map((step) => (step.id === id ? { ...step, ...changes } : step)),
            },
        })),

    removeStep: (id) =>
        set((state) => ({
            draft: { ...state.draft, steps: state.draft.steps.filter((step) => step.id !== id) },
        })),

    reset: () => set({ step: 1, draft: emptyDraft }),
}));

//to start new wizard from anywhere (FAB, empty state...)
export const openNewProject = () => {
    useProjectDraftStore.getState().reset();
    router.push('/projects/new');
};