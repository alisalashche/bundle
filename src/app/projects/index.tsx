import { AddButton } from '@/components/general-styled-components/buttons/add-button';
import { EmptyState } from '@/components/general-styled-components/layout/empty-state';
import { PageHeader } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { Breadcrumbs } from '@/components/general-styled-components/navigation/breadcrumbs';
import { ProjectSection } from '@/components/projects/project-section';
import { openNewProject } from '@/hooks/use-project-draft-store';
import { useProjectStore } from '@/hooks/use-project-store';
import { groupByMonth } from '@/utils/dates';
import { router } from 'expo-router';

export default function ProjectsScreen() {
  const projects = useProjectStore((state) => state.projects);
  const active = projects.filter((project) => project.status === 'active');
  const finished = projects
    .filter((project) => project.status === 'finished' && project.finishedAt)
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!));

  const addProject = () => router.push('/projects/new');

  return (
    <Screen>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
      <PageHeader title="Projects" description="Keep track of all project’s materials and progress" />
      <AddButton label="Start new project" onPress={addProject} />
      {projects.length === 0 ? (
        <EmptyState
          heading="No projects yet"
          text="Plan your first make: pick yarn, add steps and track your progress."
          actionLabel="New project"
          onAction={openNewProject}
        />
      ) : (
        <>
          {active.length > 0 && (
            <ProjectSection
              title={`Works in progress  x${active.length}`}
              groups={groupByMonth(active, (project) => project.createdAt)}
            />
          )}
          {finished.length > 0 && (
            <ProjectSection
              title="Admire your works"
              groups={groupByMonth(finished, (project) => project.finishedAt!)}
            />
          )}
        </>
      )}
    </Screen>
  );
}