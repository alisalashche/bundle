import { NotesBox } from '@/components/general-styled-components/inputs/notes-textarea';
import { EmptyState } from '@/components/general-styled-components/layout/empty-state';
import { PageHeader } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { Breadcrumbs } from '@/components/general-styled-components/navigation/breadcrumbs';
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useYarnStore } from '@/hooks/use-yarn-store';
import { confirmDelete } from '@/utils/yarn';

export default function YarnDetailScreen() {
    // reads the variable from the URL
    const { id } = useLocalSearchParams<{ id: string }>();

    const yarns = useYarnStore((state) => state.yarns);
    const deleteYarn = useYarnStore((state) => state.deleteYarn);
    const markAsUsed = useYarnStore((state) => state.markAsUsed);
    const updateYarn = useYarnStore((state) => state.updateYarn);

    const yarn = yarns.find((yarn) => yarn.id === id);

    if (!yarn) {
        return (
            <Screen>
                <EmptyState heading='Oops, yarn is not found' />
            </Screen>
        );
    }
    return (
        <Screen>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Yarn', href: '/yarn' }, { label: `${yarn.name}` }]} />
            {yarn.photoUri && (
                <Image
                    source={{ uri: yarn.photoUri }}
                    style={{ width: '100%', height: 200, borderRadius: '20px', }}
                />
            )}
            <PageHeader title={yarn.name} description="All yarns that you already used." />

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

            <NotesBox notes={yarn.notes} onSave={(notes) => updateYarn(yarn.id, { notes })} />

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
            <Pressable onPress={() => confirmDelete({ yarn, onConfirm: deleteYarn })}>
                <Text>Delete</Text>
            </Pressable>
        </Screen>
    );
}