import { Stack } from 'expo-router';

export default function TabStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name='yarn/new' options={{ presentation: 'modal'}} />
    </Stack>);
}
