import { styled } from 'styled-components/native';

const Container = styled.Pressable<{ $selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.lightGray)};
`;

const TagText = styled.Text<{ $selected: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.grey)};
`;

type TagProps = { label: string; selected: boolean; onPress: () => void };

export function Tag({ label, selected, onPress }: TagProps) {
    return (
        <Container accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} $selected={selected}>
            <TagText $selected={selected}>{label}</TagText>
        </Container>
    );
}