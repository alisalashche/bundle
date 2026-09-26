import type { Project } from '@/types/project';
import { formatShort } from '@/utils/dates';
import { getCover } from '@/utils/project';
import { router } from 'expo-router';
import { Card } from './grid-card';

export function ProjectCard({ project }: { project: Project }) {
  const subtitle = project.finishedAt
    ? `Finished: ${formatShort(project.finishedAt)}`
    : `Start: ${formatShort(project.createdAt)}`;

  return (
    <Card
      size="big"
      title={project.name}
      subtitle={subtitle}
      imageUri={getCover(project)}
      onPress={() => router.push(`/projects/${project.id}`)}
    />
  );
}