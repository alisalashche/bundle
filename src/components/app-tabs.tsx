import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTheme } from 'styled-components/native';

export default function AppTabs() {
  const theme = useTheme();

  return (
    <NativeTabs tintColor={theme.colors.primary}>
      <NativeTabs.Trigger name="(index)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="projects">
        <NativeTabs.Trigger.Label>Projects</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="tray.fill" md="inbox" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="inspiration">
        <NativeTabs.Trigger.Label>Inspo</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="sparkles" md="auto_awesome" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.crop.circle.fill" md="account_circle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
