import AppTabs from '@/components/app-tabs';
import { theme } from '@/constants/theme';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {

  const [fontLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });
  if (!fontLoaded) return null; //show nothing untill font loaded

  return (
    <ThemeProvider theme={theme}>
      <AppTabs />
    </ThemeProvider>
  );
}
