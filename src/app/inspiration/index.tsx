import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { inspiration } from '@/data/inspiration';

export default function InspirationScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']} >
            <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
                <Text>Logo </Text>
                < View >
                    <Text>Inspiration </Text>
                    < Text > Keep all patterns, references, tutorials, posts, and products in one place </Text>
                </View>
                < Text > + Add new inspiration </Text>
                {
                    inspiration.map((item) => (
                        <Link key={item.id} href={`/inspiration/${item.id}`}>
                            <Text>{item.title}({item.category}) </Text>
                        </Link>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}