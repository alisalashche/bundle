import { styled } from "styled-components/native";

const Container = styled.Text`
  padding: ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const BadgeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.grey};
`;

type BadgeProps = { label: string; };

export function Badge({ label }: BadgeProps) {
    return (
        <Container>
            <BadgeText>{label}</BadgeText>
        </Container>
    );
}