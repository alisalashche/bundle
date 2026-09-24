import AppTabs from '@/components/app-tabs';

// Root of the app. Same pattern as plant-based-barista: the root renders the tabs.
// In step 5 the styled-components ThemeProvider will wrap <AppTabs /> here.
export default function RootLayout() {
  return <AppTabs />;
}
