import { router, usePathname } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, styled } from 'styled-components/native';
import { openNewProject } from '@/hooks/use-project-draft-store';
import { raisedShadow } from '@/constants/shadow';

const VISIBLE_ON = ['/', '/yarn', '/projects', '/inspiration', '/profile'];

const Container = styled.View<{ $bottom: number }>`
  position: absolute;
  right: 24px;
  bottom: ${({ $bottom }) => $bottom}px;
  align-items: flex-end;
  gap: 12px;
`;

const MenuItem = styled.Pressable`
  justify-content: flex-end;
  padding:  ${({ theme }) => theme.spacing.xs}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  background-color: rgba(255, 255, 255, 0.92);
  ${raisedShadow};
`;

const MenuText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg}px;
  color: ${({ theme }) => theme.colors.black};
`;

const Fab = styled.Pressable<{ $open: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $open }) => ($open ? theme.colors.lightGray : theme.colors.primary)};
  shadow-color: #000000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.25;
  shadow-radius: 5px;
  ${raisedShadow}
`;

export function FabMenu() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    if (!VISIBLE_ON.includes(pathname)) return null;

    // close the menu first, then action
    const choose = (action: () => void) => {
        setOpen(false);
        action();
    };

    return (
        <Container $bottom={insets.bottom + 70} pointerEvents="box-none">
            {open && (
                <>
                    <MenuItem accessibilityRole="button" onPress={() => choose(openNewProject)}>
                        <MenuText>New project</MenuText>
                    </MenuItem>
                    <MenuItem accessibilityRole="button" onPress={() => choose(() => router.push('/yarn/new'))}>
                        <MenuText>New yarn</MenuText>
                    </MenuItem>
                    <MenuItem accessibilityRole="button" onPress={() => choose(() => router.push('/yarn/new'))}>
                        <MenuText>New inspo</MenuText>
                    </MenuItem>
                </>
            )}
            <Fab
                accessibilityRole="button"
                accessibilityLabel={open ? 'Close menu' : 'Add new'}
                onPress={() => setOpen(!open)}
                $open={open}
            >
                <SymbolView name={open ? 'xmark' : 'plus'} size={26} weight="bold"
                    tintColor={open ? theme.colors.grey : theme.colors.white} />
            </Fab>
        </Container>
    );
}