import { cardShadow } from '@/constants/shadow';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  ${cardShadow}
`;

const IconWrap = styled.View`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: ${({ theme }) => theme.colors.lightRed};
`;

const CardLabel = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.black};
`;

type AddButtonProps = { label: string; onPress: () => void; icon?: SymbolViewProps['name'] };

export function AddButton({ label, onPress, icon = 'plus' }: AddButtonProps) {
  const theme = useTheme();
  return (
    <Container accessibilityRole="button" onPress={onPress}>
      <IconWrap>
        <SymbolView name={icon} size={22} tintColor={theme.colors.primary} />
      </IconWrap>
      <CardLabel>{label}</CardLabel>
      <SymbolView name="chevron.right" size={18} weight="bold" tintColor={theme.colors.primary} />
    </Container>
  );
}