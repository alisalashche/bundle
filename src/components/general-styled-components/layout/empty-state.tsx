import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';
import { Button } from '../buttons/button';

const Container = styled.View`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.jumbo}px ${({ theme }) => theme.spacing.jumbo}px;
`;

const IconCircle = styled.View`
  width: 76px;
  height: 76px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: ${({ theme }) => theme.colors.lightRed};
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: center;
`;

type EmptyStateProps = {
  heading: string;
  text?: string;
  icon?: SymbolViewProps['name'];
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ heading, text, icon = 'xmark.circle', actionLabel, onAction }: EmptyStateProps) {
  const theme = useTheme();
  return (
    <Container>
      <IconCircle>
        <SymbolView name={icon} size={38} tintColor={theme.colors.primary} />
      </IconCircle>
      <Title>{heading}</Title>
      {text && <Description>{text}</Description>}
      {actionLabel && onAction && <Button label={actionLabel} size="md" align="center" onPress={onAction} />}
    </Container>
  );
}