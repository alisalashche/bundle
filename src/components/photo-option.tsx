import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import styled, { useTheme } from 'styled-components/native';

const Box = styled.Pressable<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.placeholder};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};

  shadow-color: #000000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.06;
  shadow-radius: 9px;
`;

const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.dark};
`;

type PhotoOptionProps = {
    icon: SymbolViewProps['name'];
    label: string;
    height: number;
    onPress: () => void;
};

export function PhotoOption({ icon, label, height, onPress }: PhotoOptionProps) {
    const theme = useTheme();
    return (
        <Box accessibilityRole="button" onPress={onPress} $height={height}>
            <SymbolView name={icon} size={30} tintColor={theme.colors.dark} />
            <OptionText>{label}</OptionText>
        </Box>
    );
}