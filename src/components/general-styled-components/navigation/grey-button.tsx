import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';

type Variant = 'photo' | 'add-link';

type ContainerProps = {
  $variant: Variant;
};

const Container = styled.Pressable<ContainerProps>`
  min-height: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $variant }) => ($variant === 'photo' ? 'flex-start' : 'center')};
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const IconCircle = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.grey};
`;

type LinkButtonProps = {
  variant: Variant,
  icon: SymbolViewProps['name'];
  label: string;
  onPress: () => void;
};

export function LinkButton({ variant, icon, label, onPress}: LinkButtonProps) {
  const theme = useTheme();
  return (
    <Container accessibilityRole="button" onPress={onPress} $variant={variant} >
      {variant === 'add-link' ? (
        <IconCircle>
          <SymbolView name={icon} size={18} weight="bold" tintColor={theme.colors.white} />
        </IconCircle>
      ) : (
          <SymbolView name={icon} size={26} tintColor={theme.colors.darkGrey} />
      )}
      <ButtonText>{label}</ButtonText>
    </Container>
  );
}
