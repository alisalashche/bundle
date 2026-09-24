import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
        <Text>Logo</Text>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My bundle</Text>

          <Link href='/projects'>
            <Text>Projects {'>'}</Text>
            <Text>0 WIPs</Text>
          </Link>

          <Link href='/yarn'>
            <Text>Yarn collection {'>'}</Text>
            <Text>0 yarns</Text>
          </Link>
        </View>

        <View>
          <Text>Get inspired</Text>
          <Text>All you saved inspo pictures, tutorials, and patters will be here</Text>
        </View>

        <View>
          <Text>Admire your works</Text>
          <Text>Comlete your first work.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
