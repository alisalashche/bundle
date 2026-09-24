import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import styled, { useTheme } from 'styled-components/native';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const LinkText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.primary};
`;

type BackLinkProps = { label?: string; onPress?: () => void };

export function BackLink({ label = 'Back', onPress }: BackLinkProps) {
    const theme = useTheme();
    return (
        <Container accessibilityRole="button" onPress={onPress ?? (() => router.back())}>
            <SymbolView name="chevron.left" size={14} tintColor={theme.colors.text} />
            <LinkText>{label}</LinkText>
        </Container>
    );
}