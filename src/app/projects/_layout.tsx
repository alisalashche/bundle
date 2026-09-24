import { Stack } from 'expo-router';

// Each tab has its own stack, so detail screens open inside the tab
// and the tab bar stays visible (like in the Figma designs).
// headerShown: false because Figma uses its own header (Logo + breadcrumbs), not the iOS one.
export default function TabStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
