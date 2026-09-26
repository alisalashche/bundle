import { styled } from 'styled-components/native';

// h1
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  color: ${({ theme }) => theme.colors.black};
`;

export const CenteredTitle = styled(Title)`
  text-align: center;
`;

// h2
export const Heading = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  color: ${({ theme }) => theme.colors.black};
`;

// Month dividers
export const MonthLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.black};
`;

// Page descriptions
export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

// Wizard descriptions
export const CenteredDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.darkGrey};
  text-align: center;
`;

// Form & info labels
export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

// Validation messages
export const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.primary};
`;

// Small print under buttons
export const Hint = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
`;