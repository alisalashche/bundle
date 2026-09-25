import { Image } from 'expo-image';
import { router } from 'expo-router';
import styled from 'styled-components/native';
import type { Project } from '@/types/project';
import { formatShort } from '@/utils/dates';
import { getCover } from '@/utils/project';

const Card = styled.Pressable`
  width: 48.5%;
  height: 185px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  background-color: ${({ theme }) => theme.colors.placeholder};
`;

const Photo = styled(Image)`
  width: 100%;
  height: 69%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Info = styled.View`
  padding: 15px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.black};
`;

const Meta = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.black};
`;

export function ProjectCard({ project }: { project: Project }) {
    const cover = getCover(project);
    const isFinished = project.status === 'finished' && project.finishedAt;

    return (
        <Card accessibilityRole="button" onPress={() => router.push(`/projects/${project.id}`)}>
            <Photo source={cover ? { uri: cover } : undefined} contentFit="cover" />
            <Info>
                <Name numberOfLines={1}>{project.name}</Name>
                <Meta>
                    {isFinished ? `Finished: ${formatShort(project.finishedAt!)}` : `Start: ${formatShort(project.createdAt)}`}
                </Meta>
            </Info>
        </Card>
    );
}