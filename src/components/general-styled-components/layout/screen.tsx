import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

// .attrs() to set props (not only styles) from the theme
const Scroll = styled.ScrollView.attrs(({ theme }) => ({
    contentContainerStyle: {
        padding: theme.spacing.lg,
        gap: theme.spacing.lg
    },
    keyboardShouldPersistTaps: 'handled' as const,
}))``;

const Header = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.xs}px 0;
`;

const LogoBox = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.border};
`;

const LogoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

const Content = styled.View`
  gap: ${({ theme }) => theme.spacing.xl}px;
`;

const Footer = styled.View`
  padding: 0 ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.sm}px;
`;

type ScreenProps = {
    children: ReactNode;
    footer?: ReactNode; // fixed button at the bottom of create screens
};

export function Screen({ children, footer }: ScreenProps) {
    return (
        <Safe edges={footer ? ['top', 'bottom'] : ['top']}>
            <Scroll>
                <Header>
                    <LogoBox>
                        <LogoText>Bundle</LogoText>
                    </LogoBox>
                </Header>
                <Content>{children}</Content>
            </Scroll>
            {footer && <Footer>{footer}</Footer>}
        </Safe>
    );
}