import { Image } from "expo-image";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useYarnStore } from '@/hooks/use-yarn-store';

export default function YarnArchiveScreen() {

    const yarns = useYarnStore((state) => state.yarns);
    const archived = yarns.filter((yarn) => yarn.archived);
    return (
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

                {archived.length === 0 ? (
                    <Text>Nothing here yet</Text>
                ) : (
                    archived.map((yarn) => (
                        <Link key={yarn.id} href={`/yarn/${yarn.id}`}>
                            {yarn.photoUri && (
                                <Image
                                    source={{ uri: yarn.photoUri }}
                                    style={{ width: '100%', height: 200 }}
                                />
                            )}
                            <Text>{yarn.name}</Text>
                        </Link>
                    )
                    )
                )
                }
            </ScrollView>
        </SafeAreaView>
    );
}
