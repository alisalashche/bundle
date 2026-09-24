import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { inspiration } from '@/data/inspiration';

export default function InspirationDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const item = inspiration.find((entry) => entry.id === id);

    if (!item) return <SafeAreaView><Text>Not found</Text></SafeAreaView>;

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
                <Text>Logo</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Link href="/">Home</Link>
                    <Text>{'>'}</Text>
                    <Link href="/inspiration">Inspiration</Link>
                    <Text>{'>'}</Text>
                    <Text>{item.title}</Text>
                </View>
                <Text>{item.title}</Text>
                {item.link && <Text>{item.link}</Text>}
                <Text>{item.notes ?? 'No notes yet'}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}