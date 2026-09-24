import styled from 'styled-components/native';

const Row = styled.Pressable`
  padding: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.placeholder};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
`;

const RowText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.dark};
`;

export function LinkRow({ label, onPress }: { label: string; onPress: () => void }) {
    return (
        <Row accessibilityRole="link" onPress={onPress}>
            <RowText>{label}</RowText>
        </Row>
    );
}