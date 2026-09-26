import type { Project } from "@/types/project";
import { Fragment } from "react";
import { ProjectCard } from "../general-styled-components/layout/cards/project-card";
import { Grid } from '@/components/general-styled-components/layout/cards/card';
import { Heading, MonthLabel } from "../general-styled-components/typography";

type ProjectSectionProps = { title: string; groups: { title: string; items: Project[] }[] };

export function ProjectSection({ title, groups }: ProjectSectionProps) {
  return (
    <>
      <Heading>{title}</Heading>
      {groups.map((group) => (
        <Fragment key={group.title}>
          <MonthLabel>{group.title}</MonthLabel>
          <Grid size='big'>
            {group.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Grid>
        </Fragment>
      ))}
    </>
  );
}