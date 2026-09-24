import styled from 'styled-components/native';
import { Title } from './typography';

const Container = styled.View`
  gap: 3px;
  padding-bottom: 10px;
`;

const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

export function PageHeader({ title, description }: { title: string; description?: string }) {
    return (
        <Container>
            <Title accessibilityRole="header">{title}</Title>
            {description && <Description>{description}</Description>}
        </Container>
    );
}