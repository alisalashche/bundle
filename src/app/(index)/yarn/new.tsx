import { useYarnStore } from '@/hooks/use-yarn-store';
import type { YarnType } from '@/types/yarn';
import { pickPhoto, takePhoto } from '@/utils/images';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//all text inputs 
const fields = [
    { key: 'name', label: 'Brand/Name', numeric: false },
    { key: 'material', label: 'Material', numeric: false },
    { key: 'lengthM', label: 'Length (m)', numeric: true },
    { key: 'weightG', label: 'Weight (g)', numeric: true },
    { key: 'hookSize', label: 'Hook size', numeric: false },
    { key: 'needleSize', label: 'Needles size', numeric: false },
    { key: 'shop', label: 'Shop', numeric: false },
    { key: 'quantity', label: 'Quantity you have', numeric: true },
    { key: 'notes', label: 'Notes (optional)', numeric: false },
] as const;

type FormKey = (typeof fields)[number]['key'];

export default function NewYarnScreen() {
    const addYarn = useYarnStore((state) => state.addYarn);
    const [form, setForm] = useState<Record<FormKey, string>>({
        name: '',
        material: '',
        lengthM: '',
        weightG: '',
        hookSize: '',
        needleSize: '',
        shop: '',
        quantity: '1',
        notes: '',
    });

    const [type, setType] = useState<YarnType>('skeins');
    const [photoUri, setPhotoUri] = useState<string>();
    const [step, setStep] = useState<1 | 2>(1);

    const update = (key: FormKey, value: string) => setForm({
        ...form, [key]: value
    });

    const choosePhoto = async (source: () => Promise<string | undefined>) => {
        const uri = await source(); if (uri) setPhotoUri(uri);
    };

    const save = () => {
        addYarn({
            name: form.name.trim(),
            material: form.material,
            lengthM: Number(form.lengthM) || 0,
            weightG: Number(form.weightG) || 0,
            hookSize: form.hookSize || undefined,
            needleSize: form.needleSize || undefined,
            shop: form.shop,
            quantity: Number(form.quantity) || 1,
            notes: form.notes || undefined, type, photoUri,
        });
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ padding: 18, gap: 16 }}
                keyboardShouldPersistTaps="handled"
            >
                <Pressable onPress={() => router.back()}>
                    <Text>{'<'} Cancel</Text>
                </Pressable>
                {step === 1 ? (
                    <>
                        <Text>Tell about yarn</Text>
                        {fields.map((field) => (
                            <View key={field.key}>
                                <Text>{field.label}</Text>
                                <TextInput
                                    value={form[field.key]}
                                    onChangeText={(value) => update(field.key, value)}
                                    keyboardType={field.numeric ? 'number-pad' : 'default'}
                                    style={{ borderWidth: 1, padding: 8 }} />
                            </View>))}

                        <Text>Type</Text>
                        <View style={{ flexDirection: 'row', gap: 16 }}>
                            {(['skeins', 'balls', 'hanks'] as const).map((option) => (
                                <Pressable
                                    key={option}
                                    onPress={() => setType(option)}>
                                    <Text>{type === option ? `[${option}]` : option}</Text>
                                </Pressable>))}
                        </View>
                    </>
                ) : (
                    <>
                        <Text>Add picture</Text>
                        {photoUri && <Image
                            source={{ uri: photoUri }}
                            style={{ width: 200, height: 200 }} />}
                        <Pressable onPress={() => choosePhoto(pickPhoto)}>
                            <Text>Attach photo from library</Text>
                        </Pressable>

                        <Pressable onPress={() => choosePhoto(takePhoto)}>
                            <Text>Take picture</Text>
                        </Pressable>
                        <Pressable onPress={save} disabled={!form.name.trim()}>
                            <Text>{form.name.trim() ? '[ Add yarn ]' : 'Fill in a name first'}</Text>
                        </Pressable>
                    </>
                )
                }
            </ScrollView>
        </SafeAreaView>
    );
}