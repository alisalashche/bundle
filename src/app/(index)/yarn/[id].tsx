import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useYarnStore } from '@/hooks/use-yarn-store';

export default function YarnDetailScreen() {
    // reads the variable from the URL
    // when open /yarn/2, id is "2"
    const { id } = useLocalSearchParams<{ id: string }>();
    
    const yarns = useYarnStore((state) => state.yarns);
    const yarn = yarns.find((yarn) => yarn.id === id);
    if (!yarn) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>Yarn not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
                <Text>Logo</Text>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Link href="/">Home</Link>
                    <Text>{'>'}</Text>
                    <Link href="/yarn">Yarn</Link>
                    <Text>{'>'}</Text>
                    <Text>{yarn.name}</Text>
                </View>

                <Text>Photo</Text>
                <Text>{yarn.name}</Text>

                <View>
                    <Text>Quantity: {yarn.quantity}</Text>
                    <Text>Material: {yarn.material}</Text>
                    <Text>Length: 150m</Text>
                    <Text>Weight: 200g</Text>
                    <Text>Needles size: 4mm</Text>
                    <Text>Hook size: 5mm</Text>
                    <Text>Type: Skeins</Text>
                </View>

                <Text>Notes here if added</Text>
                <Text>Assign to a project</Text>
                <Text>Mark as used</Text>
            </ScrollView>
        </SafeAreaView>
    );
}