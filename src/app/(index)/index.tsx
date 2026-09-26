import { Grid } from '@/components/general-styled-components/layout/cards/card';
import { ProjectCard } from '@/components/general-styled-components/layout/cards/project-card';
import { Section } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BundleRow } from '@/components/general-styled-components/navigation/bundle-preview';
import { CenteredDescription, Title } from '@/components/general-styled-components/typography';
import { useProjectStore } from '@/hooks/use-project-store';
import { useYarnStore } from '@/hooks/use-yarn-store';
import { getCover } from '@/utils/project';
import { router } from 'expo-router';
import { styled } from 'styled-components/native';

const Rows = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const EmptyText = styled(CenteredDescription)`
  padding: ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.jumbo}px;
`;

export default function HomeScreen() {
  const projects = useProjectStore((state) => state.projects);
  const yarns = useYarnStore((state) => state.yarns);

  const active = projects.filter((project) => project.status === 'active');
  const available = yarns.filter((yarn) => !yarn.archived);
  const finished = projects
    .filter((project) => project.status === 'finished' && project.finishedAt)
    .sort((a, b) => b.finishedAt!.localeCompare(a.finishedAt!));

  return (
    <Screen>
      <Section>
        <Title>My bundle</Title>
        <Rows>
          <BundleRow
            title="Projects"
            subtitle={`${active.length} WIP`}
            photos={active.map((project) => getCover(project))}
            onPress={() => router.push('/projects')}
          />
          <BundleRow
            title="Yarn collection"
            subtitle={`${available.length} yarn types`}
            photos={available.map((yarn) => yarn.photoUri)}
            onPress={() => router.push('/yarn')}
          />
        </Rows>
      </Section>

      <Section>
        <Title>Inspiration</Title>
        <EmptyText>Try to save pictures, tutorials, and patterns</EmptyText>
      </Section>

      <Section>
        <Title>Admire your works</Title>
        {finished.length === 0 ? (
          <EmptyText>Complete your first work</EmptyText>
        ) : (
          <Grid size='big'>
            {finished.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Grid>
        )}
      </Section>
    </Screen>
  );
}