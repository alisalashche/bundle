import { raisedShadow } from '@/constants/shadow';
import { styled } from 'styled-components/native';

type Variant = 'primary' | 'secondary' ;
type Size = 'sm' | 'md' | 'lg';
type Align = 'stretch' | 'flex-start' | 'center' | 'flex-end';

const variantColors = {
    primary: 'primary',
    secondary: 'grey',
} as const;
const sizeFonts = { sm: 'sm', md: 'md', lg: 'lg' } as const;

type ContainerProps = { $variant: Variant; $size: Size; $align: Align; $grow: boolean; $disabled: boolean };

const Container = styled.Pressable<ContainerProps>`
  align-self: ${({ $align }) => $align};
  flex-grow: ${({ $grow }) => ($grow ? 1 : 0)};
  min-width: ${({ $size }) => ($size === 'lg' ? 113 : 0)}px;
  padding: ${({ theme, $size }) =>
        $size === 'sm'
            ? `${theme.spacing.xs}px ${theme.spacing.md}px`
            : $size === 'md'
                ? `${theme.spacing.md}px ${theme.spacing.xl}px`
                : `${theme.spacing.sm}px ${theme.spacing.md}px`};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme, $size }) => ($size === 'sm' ? theme.radius.full : theme.radius.md)}px;
  background-color: ${({ theme, $variant }) => theme.colors[variantColors[$variant]]};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  ${raisedShadow}
`;

const ButtonText = styled.Text<{ $size: Size }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme, $size }) => theme.fontSizes[sizeFonts[$size]]}px;
  color: ${({ theme }) => theme.colors.white};
`;

type ButtonProps = {
    label: string;
    onPress: () => void;
    variant?: Variant;
    size?: Size;
    align?: Align;
    grow?: boolean;
    disabled?: boolean;
};

export function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'lg',
    align = 'stretch',
    grow = false,
    disabled = false,
}: ButtonProps) {
    return (
        <Container
            accessibilityRole="button"
            onPress={onPress}
            disabled={disabled}
            hitSlop={size === 'sm' ? 8 : 0}
            $variant={variant}
            $size={size}
            $align={align}
            $grow={grow}
            $disabled={disabled}
        >
            <ButtonText $size={size}>{label}</ButtonText>
        </Container>
    );
}