import styled from 'styled-components/native';

type Variant = 'primary' | 'secondary' | 'dark';
type Size = 'sm' | 'md' | 'lg';
type Align = 'stretch' | 'flex-start' | 'center' | 'flex-end';

// One lookup table per size, taken from Figma
const sizes = {
    sm: { height: 28, paddingX: 14, fontSize: 12 },
    md: { height: 48, paddingX: 22, fontSize: 15 },
    lg: { height: 44, paddingX: 28, fontSize: 20 },
} as const;

type ContainerProps = {
    $variant: Variant;
    $size: Size;
    $align: Align;
    $grow: boolean;
    $disabled: boolean;
};

const Container = styled.Pressable<ContainerProps>`
  align-self: ${({ $align }) => $align};
  flex-grow: ${({ $grow }) => ($grow ? 1 : 0)};
  height: ${({ $size }) => sizes[$size].height}px;
  padding: 0 ${({ $size }) => sizes[$size].paddingX}px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme, $size }) => ($size === 'sm' ? theme.radius.full : theme.radius.md)}px;
  background-color: ${({ theme, $variant }) => theme.colors[$variant]};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

const ButtonText = styled.Text<{ $size: Size }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ $size }) => sizes[$size].fontSize}px;
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
            hitSlop={size === 'sm' ? 8 : 0} //invisible area to touch easier
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