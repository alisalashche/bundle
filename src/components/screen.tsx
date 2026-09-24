import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

// .attrs() lets set props (not only styles) from the theme
const Scroll = styled.ScrollView.attrs(({ theme }) => ({
    contentContainerStyle: { padding: theme.spacing.lg, gap: theme.spacing.md },
    keyboardShouldPersistTaps: 'handled' as const,
}))``;

const LogoBox = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.placeholder};
`;

const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
`;

const Footer = styled.View`
  padding: 0 ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.sm}px;
`;

type ScreenProps = {
    children: ReactNode;
    footer?: ReactNode; // the fixed button at the bottom of create screens
};

export function Screen({ children, footer }: ScreenProps) {
    return (
        <Safe edges={footer ? ['top', 'bottom'] : ['top']}>
            <Scroll>
                <LogoBox>
                    <LogoText>Logo</LogoText>
                </LogoBox>
                {children}
            </Scroll>
            {footer && <Footer>{footer}</Footer>}
        </Safe>
    );
}