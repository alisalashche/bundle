import styled from 'styled-components/native';

const Container = styled.Pressable<{ $selected: boolean }>`
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  border-width: 1px;
  border-color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.white)};
`;

const ChipText = styled.Text<{ $selected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.text)};
`;

type ChipProps = { label: string; selected: boolean; onPress: () => void };

export function Chip({ label, selected, onPress }: ChipProps) {
    return (
        <Container
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={onPress}
            $selected={selected}
        >
            <ChipText $selected={selected}>{label}</ChipText>
        </Container>
    );
}