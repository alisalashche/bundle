import { Fragment } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmptyState } from '@/components/empty-state';
import { CardGrid } from '@/components/layout';
import { PageHeader } from '@/components/page-header';
import { ProjectCard } from '@/components/project-card';
import { Screen } from '@/components/screen';
import { Heading, MonthLabel } from '@/components/typography';
import { openNewProject } from '@/hooks/use-project-draft-store';
import { useProjectStore } from '@/hooks/use-project-store';
import type { Project } from '@/types/project';
import { groupByMonth } from '@/utils/dates';

type ProjectSectionProps = { title: string; groups: { title: string; items: Project[] }[] };

function ProjectSection({ title, groups }: ProjectSectionProps) {
  return (
    <>
      <Heading>{title}</Heading>
      {groups.map((group) => (
        <Fragment key={group.title}>
          <MonthLabel>{group.title}</MonthLabel>
          <CardGrid>
            {group.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </CardGrid>
        </Fragment>
      ))}
    </>
  );
}

export default function ProjectsScreen() {
  const projects = useProjectStore((state) => state.projects);
  const active = projects.filter((project) => project.status === 'active');
  const finished = projects
    .filter((project) => project.status === 'finished' && project.finishedAt)
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!));

  return (
    <Screen>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
      <PageHeader title="Projects" description="Keep track of all project’s materials and progress" />

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