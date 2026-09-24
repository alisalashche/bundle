import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import styled from 'styled-components/native';
import type { Yarn } from '@/types/yarn';

const Card = styled.Pressable`
  width: 32%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.xs}px;
  background-color: ${({ theme }) => theme.colors.placeholder};
`;

const Photo = styled(Image)`
  width: 100%;
  height: 69%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Corner = styled.View`
  position: absolute;
  top: 4px;
  right: 6px;
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Name = styled.Text`
  padding: 6px 8px;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
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
            <Name numberOfLines={1}>{yarn.name}</Name>
        </Card>
    );
}