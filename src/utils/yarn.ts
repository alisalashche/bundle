import type { Yarn } from "@/types/yarn";
import { Alert } from "react-native";
import { router } from "expo-router";

type confirmDeleteProps = {
    yarn: Yarn,
    onConfirm: (id: string) => void;
};

export const confirmDelete = ({ yarn, onConfirm }: confirmDeleteProps) => {
    Alert.alert(
        `Are you sure?`,
        `${yarn.name} will be deleted from your stash permanently.`,
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive',
                onPress: () => {
                    router.back();
                    onConfirm(yarn.id);
                },
            },
        ]);
}