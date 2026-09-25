import styled from 'styled-components/native';

//sregular grid
export const Grid = styled.View` 
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

//big card grid
export const CardGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 25px;
`;

//half row
export const Half = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const ChipRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

//label + chips
export const FieldGroup = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

