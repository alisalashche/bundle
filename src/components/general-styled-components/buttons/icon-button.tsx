import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme, styled } from 'styled-components/native';

const Container = styled.Pressable`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

type IconButtonProps = {
    icon: SymbolViewProps['name'];
    label: string;
    onPress?: () => void;
};

export function IconButton({ icon, label, onPress }: IconButtonProps) {
    const theme = useTheme();
    return (
        <Container accessibilityRole="button" accessibilityLabel={label} hitSlop={6} disabled={!onPress} onPress={onPress}>
            <SymbolView name={icon} size={16} tintColor={theme.colors.darkGrey} />
        </Container>
    );
}