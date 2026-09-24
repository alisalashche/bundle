import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import styled, { useTheme } from 'styled-components/native';

const Card = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl}px;
  background-color: ${({ theme }) => theme.colors.white};
  shadow-color: #000000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.06;
  shadow-radius: 9px;
`;

const IconWrap = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.tint};
`;

const CardLabel = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.text};
`;

type AddCardProps = {
    label: string;
    onPress: () => void;
    icon?: SymbolViewProps['name'];
};

export function AddCard({ label, onPress, icon = 'plus' }: AddCardProps) {
    const theme = useTheme();
    return (
        <Card accessibilityRole="button" onPress={onPress}>
            <IconWrap>
                <SymbolView name={icon} size={22} tintColor={theme.colors.primary} />
            </IconWrap>
            <CardLabel>{label}</CardLabel>
            <SymbolView name="chevron.right" size={16} tintColor={theme.colors.primary} />
        </Card>
    );
}