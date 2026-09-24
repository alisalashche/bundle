import styled from 'styled-components/native';

type Variant = 'primary' | 'secondary';
type Align = 'stretch' | 'flex-start' | 'center' | 'flex-end';

const Container = styled.Pressable<{ $variant: Variant; $align: Align; $disabled: boolean }>`
  align-self: ${({ $align }) => $align};
  align-items: center;
  padding: 10px 28px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme, $variant }) =>
        $variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

type ButtonProps = {
    label: string;
    onPress: () => void;
    variant?: Variant;
    align?: Align;
    disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', align = 'stretch', disabled = false }: ButtonProps) {
    return (
        <Container
            accessibilityRole="button"
            onPress={onPress}
            disabled={disabled}
            $variant={variant}
            $align={align}
            $disabled={disabled}
        >
            <ButtonText>{label}</ButtonText>
        </Container>
    );
}