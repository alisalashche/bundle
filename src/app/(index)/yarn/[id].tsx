import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useYarnStore } from '@/hooks/use-yarn-store';

export default function YarnDetailScreen() {
    // reads the variable from the URL
    // when open /yarn/2, id is "2"
    const { id } = useLocalSearchParams<{ id: string }>();

    const yarns = useYarnStore((state) => state.yarns);
    const deleteYarn = useYarnStore((state) => state.deleteYarn);
    const markAsUsed = useYarnStore((state) => state.markAsUsed);

    const yarn = yarns.find((yarn) => yarn.id === id);
    if (!yarn) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>Yarn not found</Text>
            </SafeAreaView>
        );
    }

    const confirmDelete = () => {
        Alert.alert(
            `Are you sure?`,
            `${yarn.name} will be deleted from your stash permanently.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive',
                    onPress: () => {
                        router.back();
                        deleteYarn(yarn.id);
                    },
                },
            ]);
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

                {yarn.photoUri && (
                    <Image
                        source={{ uri: yarn.photoUri }}
                        style={{ width: '100%', height: 200 }}
                    />
                )}

                <Text>{yarn.name}</Text>

                <View>
                    <Text>Quantity: {yarn.quantity}</Text>
                    <Text>Material: {yarn.material}</Text>
                    <Text>Length: {yarn.lengthM ? `${yarn.lengthM}m` : '–'}</Text>
                    <Text>Weight: {yarn.weightG ? `${yarn.weightG}g` : '–'}</Text>
                    <Text>Needles size: {yarn.needleSize ?? '–'}</Text>
                    <Text>Hook size: {yarn.hookSize ?? '–'}</Text>
                    <Text>Shop: {yarn.shop}</Text>
                    <Text>Type: Skeins</Text>
                </View>

                <Text>Notes here if added</Text>

                <Text>Assign to a project</Text>
                {!yarn.archived && (
                    <Pressable
                        onPress={() => {
                            markAsUsed(yarn.id);
                            router.back();
                        }}>
                        <Text>[ Mark as used]</Text>
                    </Pressable>
                )}
                <Pressable onPress={confirmDelete}>
                    <Text>Delete</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}