import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function YarnArchiveScreen() {
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
            <Text>Logo</Text>

            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Link href="/">Home</Link>
                <Text>{'>'}</Text>
                <Link href="/yarn">Yarn</Link>
                <Text>{'>'}</Text>
                <Text>Yarn archive</Text>
            </View>

            <View>
                <Text>Yarn archive</Text>
                <Text>All yarns that you already used</Text>
            </View>

            <Text>Nothing here yet</Text>
        </ScrollView>
    </SafeAreaView>
}
