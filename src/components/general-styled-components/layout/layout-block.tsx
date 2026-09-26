import { styled } from 'styled-components/native';
import { Description, MonthLabel, Title } from '../typography';

export const Row = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const Half = styled.View`
  flex: 1;
`;

export const Section = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

//Headers of sections, subsections 

//Page header
const PageHeaderContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <PageHeaderContainer>
      <Title accessibilityRole="header">{title}</Title>
      {description && <Description>{description}</Description>}
    </PageHeaderContainer>
  );
}

//Month header
const MonthDividerContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export function MonthHeader({ title }: { title: string }) {
  return (
    <MonthDividerContainer>
      <MonthLabel accessibilityRole="header">{title}</MonthLabel>
      <Divider />
    </MonthDividerContainer>
  );
}



