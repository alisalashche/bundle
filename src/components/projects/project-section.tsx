import type { Project } from "@/types/project";
import { Fragment } from "react";
import { ProjectCard } from "../general-styled-components/layout/cards/project-card";
import { GridBig } from "../general-styled-components/layout/layout-block";
import { Heading, MonthLabel } from "../general-styled-components/typography";

type ProjectSectionProps = { title: string; groups: { title: string; items: Project[] }[] };

export function ProjectSection({ title, groups }: ProjectSectionProps) {
  return (
    <>
      <Heading>{title}</Heading>
      {groups.map((group) => (
        <Fragment key={group.title}>
          <MonthLabel>{group.title}</MonthLabel>
          <GridBig>
            {group.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </GridBig>
        </Fragment>
      ))}
    </>
  );
}