import { Feed } from '@/components/general-styled-components/layout/cards/feed';
import { Grid } from '@/components/general-styled-components/layout/cards/grid-card';
import { ProjectCard } from '@/components/general-styled-components/layout/cards/project-card';
import { MonthHeader, Section } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BundlePreview } from '@/components/general-styled-components/navigation/bundle-preview';
import { CenteredDescription, Heading, Title } from '@/components/general-styled-components/typography';
import { router } from 'expo-router';
import { Fragment } from 'react/jsx-runtime';
import { styled } from 'styled-components/native';

import { inspiration } from '@/data/inspiration';
import { useProjectStore } from '@/hooks/use-project-store';
import { useYarnStore } from '@/hooks/use-yarn-store';

import { groupByMonth } from '@/utils/dates';
import { getCover } from '@/utils/project';

const EmptyText = styled(CenteredDescription)`
  padding: ${({ theme }) => theme.spacing.jumbo}px ${({ theme }) => theme.spacing.xl}px;
`;

const Column = styled.View`
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export default function HomeScreen() {

  const projects = useProjectStore((state) => state.projects);
  const active = projects.filter((project) => project.status === 'active');
  const works = projects
    .filter((project) => project.status === 'finished' && project.finishedAt)
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!))
    .slice(0, 6);

  const yarns = useYarnStore((state) => state.yarns);
  const available = yarns.filter((yarn) => !yarn.archived);

  return (
    <Screen>
      <Section>
        <Title accessibilityRole="header">My bundle</Title>
        <Column>
          <BundlePreview
            title="Projects"
            subtitle={
              active.length === 1
                ? `${active.length} WIP`
                : `${active.length} WIPs`
            }
            photos={active.map((project) => getCover(project))}
            onPress={() => router.push('/projects')}
          />
          <BundlePreview
            title="Yarn collection"
            subtitle={
              available.length === 1
                ? `${available.length} yarn type`
                : `${available.length} yarn types`
            }
            photos={available.map((yarn) => yarn.photoUri)}
            onPress={() => router.push('/yarn')}
          />
        </Column>
      </Section>

      <Section>
        <Heading>Get inspired</Heading>
        {inspiration.length > 0 ? (
          <EmptyText>Try to save pictures, tutorials, and patterns.</EmptyText>
        ) : (
          <Feed data={inspiration} />
        )}
      </Section>

      <Section>
        <Heading>Admire your works</Heading>
        {works.length === 0 ? (
          <EmptyText>Complete your first work.</EmptyText>
        ) : (
          groupByMonth(works, (work) => work.finishedAt!).map((group) => (
            <Fragment key={group.title}>
              <MonthHeader title={group.title} />
              <Grid size='big'>
                {group.items.map((work) => (
                  <ProjectCard key={work.id} project={work} />
                ))}
              </Grid>
            </Fragment>
          ))
        )}
      </Section>
    </Screen>
  );
}