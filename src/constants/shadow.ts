import { css } from 'styled-components/native';

export const cardShadow = css`
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px ${({ theme }) => theme.shadows.card.offsetY}px;
  shadow-opacity: ${({ theme }) => theme.shadows.card.opacity};
  shadow-radius: ${({ theme }) => theme.shadows.card.radius}px;
`;

export const raisedShadow = css`
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-offset: 0px ${({ theme }) => theme.shadows.raised.offsetY}px;
  shadow-opacity: ${({ theme }) => theme.shadows.raised.opacity};
  shadow-radius: ${({ theme }) => theme.shadows.raised.radius}px;
`;