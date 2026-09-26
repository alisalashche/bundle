import { Stack } from 'expo-router';

export default function TabStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="new-yarn" options={{ presentation: 'modal' }} />
    </Stack>
  );
}