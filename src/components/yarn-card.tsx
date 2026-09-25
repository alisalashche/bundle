import type { Yarn } from '@/types/yarn';
import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';

const Card = styled.Pressable`
  width: 32%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.placeholder};
`;

const Photo = styled(Image)`
  width: 100%;
  height: 69%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Corner = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25px;
  height: 25px;
  border-radius: 0 0 0 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Info = styled.View`
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  gap 5px;
`;

const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

const Material = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.surface};
`;

type YarnCardProps = {
  yarn: Yarn;
  onPress: () => void;
  corner?: ReactNode; // what's in the top-right; default is the amount
};

export function YarnCard({ yarn, onPress, corner }: YarnCardProps) {
  return (
    <Card
      accessibilityRole="button"
      accessibilityLabel={`${yarn.name}, ${yarn.quantity} ${yarn.type}`}
      onPress={onPress}
    >
      <Photo source={yarn.photoUri ? { uri: yarn.photoUri } : undefined} contentFit="cover" />
      <Corner>{corner ?? <Amount>x{yarn.quantity}</Amount>}</Corner>
      <Info>
        <Name numberOfLines={1}>{yarn.name}</Name>
      </Info>
    </Card>
  );
}