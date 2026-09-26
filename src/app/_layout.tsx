import AppTabs from '@/components/app-tabs';
import { View } from 'react-native';
import { FabMenu } from '@/components/general-styled-components/buttons/fab';

import { theme } from '@/constants/theme';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {

  const [fontLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black });
  if (!fontLoaded) return null; //show nothing untill font loaded

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <AppTabs />
        <FabMenu />
      </View>
    </ThemeProvider>
  );
}
