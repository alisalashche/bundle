import { router } from 'expo-router';
import { create } from 'zustand';
import type { Craft, Difficulty, ProjectStep } from '@/types/project';

export type ProjectDraft = {
    name: string;
    craft: Craft;
    difficulty: Difficulty;
    yarnNeeded: string;      // text inputs hold strings; converted when saving
    hookNeedleSize: string;
    stitches: string;
    tutorialUrl: string;
    yarnIds: string[];
    steps: ProjectStep[];
    notes: string;
    referencePhotos: string[];
};

const emptyDraft: ProjectDraft = {
    name: '',
    craft: 'knitting',
    difficulty: 'normal',
    yarnNeeded: '',
    hookNeedleSize: '',
    stitches: '',
    tutorialUrl: '',
    yarnIds: [],
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
    addStep: (step: Omit<ProjectStep, 'id' | 'done'>) => void;
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
            const { yarnIds } = state.draft;
            const next = yarnIds.includes(yarnId) ? yarnIds.filter((id) => id !== yarnId) : [...yarnIds, yarnId];
            return { draft: { ...state.draft, yarnIds: next } };
        }),

    addStep: (step) =>
        set((state) => ({
            draft: {
                ...state.draft,
                steps: [...state.draft.steps, { ...step, id: Date.now().toString(), done: false }],
            },
        })),

    removeStep: (id) =>
        set((state) => ({
            draft: { ...state.draft, steps: state.draft.steps.filter((step) => step.id !== id) },
        })),

    reset: () => set({ step: 1, draft: emptyDraft }),
}));

//start new wizard from anywhere (FAB, empty state...)
export const openNewProject = () => {
    useProjectDraftStore.getState().reset();
    router.push('/projects/new');
};