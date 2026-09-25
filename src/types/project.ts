export type Craft = 'knitting' | 'crochet';
export type Difficulty = 'easy' | 'normal' | 'difficult';

export type ProjectStep = {
    id: string;
    title: string;
    target?: string;       // "120 stitches", "2 inches"
    description?: string;
    done: boolean;
};

export type ProgressLog = {
    id: string;
    date: string;
    completedStepIds: string[];
    yarnUsed: number;
    note?: string;
    photoUri?: string;
    percent: number;
};

export type Project = {
    id: string;
    name: string;
    craft: Craft;
    difficulty: Difficulty;
    yarnNeeded: number;
    hookNeedleSize?: string;
    stitches?: string;
    tutorialUrl?: string;
    yarnIds: string[];         // yarn assigned from your stash
    steps: ProjectStep[];
    notes?: string;
    referencePhotos: string[];
    logs: ProgressLog[];
    status: 'active' | 'finished';
    createdAt: string;
    finishedAt?: string;
    finishedPhotoUri?: string;
};