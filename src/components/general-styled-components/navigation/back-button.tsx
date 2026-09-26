import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';

const Button = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.black};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.primary};
`;

type BackButtonProps = { label?: string; onPress?: () => void };

export function BackButton({ label = 'Back', onPress }: BackButtonProps) {
  const theme = useTheme();
  return (
    <Button accessibilityRole="button" hitSlop={8} onPress={onPress ?? (() => router.back())}>
      <SymbolView name="chevron.left" size={14} weight="bold" tintColor={theme.colors.primary} />
      <ButtonText>{label}</ButtonText>
    </Button>
  );
}