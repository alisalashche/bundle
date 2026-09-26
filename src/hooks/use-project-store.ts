import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Project } from '@/types/project';

export type NewProject = Omit<Project, 'id' | 'createdAt' | 'status' | 'logs'>;

interface ProjectState {
    projects: Project[];
    addProject: (project: NewProject) => string;
    updateProject: (id: string, changes: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    toggleStep: (projectId: string, stepId: string) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            projects: [],

            addProject: (project) => {
                const id = Date.now().toString();
                set((state) => ({
                    projects: [
                        { ...project, id, status: 'active', logs: [], createdAt: new Date().toISOString() },
                        ...state.projects,
                    ],
                }));
                return id;
            },

            updateProject: (id, changes) =>
                set((state) => ({
                    projects: state.projects.map((project) => (project.id === id ? { ...project, ...changes } : project)),
                })),

            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((project) => project.id !== id),
                })),

            toggleStep: (projectId, stepId) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id !== projectId
                            ? project
                            : {
                                ...project,
                                steps: project.steps.map((step) => (step.id === stepId ? { ...step, done: !step.done } : step)),
                            }
                    ),
                })),
        }),
        {
            name: 'bundle-projects',
            storage: createJSONStorage(() => AsyncStorage),
            //I had previously version 0 where i could choose only one yarn 
            version: 1,
            migrate: (saved: any) => ({
                ...saved,
                projects: (saved?.projects ?? []).map((project: any) => ({
                    ...project,
                    yarn: project.yarn ?? (project.yarnIds ?? []).map((yarnId: string) => ({ yarnId, quantity: 1 })),
                    hookNeedleSize: project.hookNeedleSize ?? '',
                })),
            }),
        }
    )
);