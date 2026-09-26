import type { Project } from '@/types/project';

export const getCover = (project: Project) => project.finishedPhotoUri ?? project.referencePhotos[0];

export const getProgress = (project: Project) => {
    if (project.status === 'finished') return 100;
    if (project.steps.length === 0) return 0;
    const done = project.steps.filter((step) => step.done).length;
    return Math.round((done / project.steps.length) * 100);
};

export const getYarnNeeded = (project: Project) =>
    project.yarn.reduce((total, item) => total + item.quantity, 0);