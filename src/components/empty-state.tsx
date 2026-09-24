import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import styled, { useTheme } from 'styled-components/native';
import { Button } from './button';

const Container = styled.View`
  align-items: center;
  gap: 16px;
  padding: 80px 28px;
`;

const IconCircle = styled.View`
  width: 76px;
  height: 76px;
  border-radius: 38px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.tint};
`;

const EmptyHeading = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const EmptyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.textMuted};
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
            <EmptyHeading>{heading}</EmptyHeading>
            {text && <EmptyText>{text}</EmptyText>}
            {actionLabel && onAction && <Button label={actionLabel} size="md" align="center" onPress={onAction} />}
        </Container>
    );
}