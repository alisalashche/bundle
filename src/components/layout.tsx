import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  gap: 25px;
`;

export const Half = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;