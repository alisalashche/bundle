import { Link } from "expo-router";
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useYarnStore } from '@/hooks/use-yarn-store';

export default function YarnScreen() {

    const yarns = useYarnStore((state) => state.yarns);
    const available = yarns.filter((yarn) => !yarn.archived);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
                <Text>Logo</Text>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Link href='/'>
                        <Text>Home</Text>
                        <Text>{'>'}</Text>
                        <Text>Yarn</Text>
                    </Link>
                </View>

                <View>
                    <Text>Yarn collection</Text>
                    <Text>Keep track of all yarns in your yarn stach.</Text>
                </View>

                <Text>+ Add new yarn</Text>

                <View>
                    <Text>Available yarn</Text>
                    {
                        available.map((yarn) => (
                            <Link key={yarn.id} href={`/yarn/${yarn.id}`}>
                                <Text>{yarn.name}</Text>
                            </Link>
                        ))
                    }
                </View>

                <Link href='/yarn/archive'>See used yarn archive {'>'}</Link>
            </ScrollView>
        </SafeAreaView>
    );
}