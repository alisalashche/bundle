import { BackLink } from '@/components/back-link';
import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { Half, Row } from '@/components/layout';
import { PhotoOption } from '@/components/photo-option';
import { Screen } from '@/components/screen';
import { StepIndicator } from '@/components/step-indicator';
import { TextField } from '@/components/text-field';
import { Label, Title } from '@/components/typography';
import styled from 'styled-components/native';

import { useYarnStore } from '@/hooks/use-yarn-store';
import type { YarnType } from '@/types/yarn';
import { pickPhoto, takePhoto } from '@/utils/images';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';


//Styled component
const CenteredTitle = styled(Title)`
  text-align: center;
`;

const ChipRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const Preview = styled(Image)`
  width: 100%;
  height: 260px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
`;

type Form = {
    name: string;
    material: string;
    lengthM: string;
    weightG: string;
    hookSize: string;
    needleSize: string;
    shop: string;
    quantity: string;
};

const yarnTypes: YarnType[] = ['skeins', 'balls', 'hanks', 'bobins'];

export default function NewYarnScreen() {
    const addYarn = useYarnStore((state) => state.addYarn);
    const [step, setStep] = useState<1 | 2>(1);
    const [form, setForm] = useState<Form>({
        name: '', material: '', lengthM: '', weightG: '',
        hookSize: '', needleSize: '', shop: '', quantity: '1',
    });
    const [type, setType] = useState<YarnType>('skeins');
    const [photoUri, setPhotoUri] = useState<string>();

    // Returns the two props every field needs, so we can spread them: {...bind('name')}
    const bind = (key: keyof Form) => ({
        value: form[key],
        onChangeText: (value: string) => setForm({ ...form, [key]: value }),
    });

    const choosePhoto = async (source: () => Promise<string | undefined>) => {
        const uri = await source();
        if (uri) setPhotoUri(uri);
    };

    const save = () => {
        addYarn({
            name: form.name.trim(),
            material: form.material,
            lengthM: Number(form.lengthM) || 1,
            weightG: Number(form.weightG) || 1,
            hookSize: form.hookSize || undefined,
            needleSize: form.needleSize || undefined,
            shop: form.shop || undefined,
            quantity: Number(form.quantity) || 1,
            type,
            photoUri,
        });
        router.back();
    };

    // Step 1
    if (step === 1) {
        return (
            <Screen
                footer={
                    <Button
                        label="Next"
                        align="flex-end"
                        disabled={
                            !form.name.trim() ||
                            !form.lengthM.trim() ||
                            !form.weightG.trim() ||
                            !form.material.trim() ||
                            !form.quantity.trim()
                        }
                        onPress={() => setStep(2)} />
                }
            >
                <BackLink label="Cancel" />
                <StepIndicator current={1} total={2} />
                <CenteredTitle>Label information</CenteredTitle>

                <TextField label="Brand/Name*" placeholder="Cozy 100% wool" {...bind('name')} />

                <Label>Type*</Label>
                <ChipRow>
                    {yarnTypes.map((option) => (
                        <Chip key={option} label={option} selected={type === option} onPress={() => setType(option)} />
                    ))}
                </ChipRow>

                <Row>
                    <Half>
                        <TextField label="Material*" placeholder="Wool" {...bind('material')} />
                    </Half>
                    <Half>
                        <TextField label="Quantity you have*" keyboardType="number-pad" {...bind('quantity')} />
                    </Half>
                </Row>

                <Row>
                    <Half>
                        <TextField label="Length* (m)" placeholder="150" keyboardType="number-pad" {...bind('lengthM')} />
                    </Half>
                    <Half>
                        <TextField label="Weight* (g)" placeholder="50" keyboardType="number-pad" {...bind('weightG')} />
                    </Half>
                </Row>

                <Label>Recommended sizes:</Label>
                <Row>
                    <Half>
                        <TextField label="Hook" placeholder="3.5mm" keyboardType="decimal-pad" {...bind('hookSize')} />
                    </Half>
                    <Half>
                        <TextField label="Needles" placeholder="3.5mm" keyboardType="decimal-pad" {...bind('needleSize')} />
                    </Half>
                </Row>

                <TextField
                    label="Shop"
                    placeholder="https://..."
                    keyboardType="url"
                    autoCapitalize="none"
                    {...bind('shop')}
                />
            </Screen>
        );
    }

    // Step 2
    return (
        <Screen footer={<Button label="Add yarn" onPress={save} />}>
            <BackLink onPress={() => setStep(1)} />
            <StepIndicator current={2} total={2} />
            <CenteredTitle>Add picture</CenteredTitle>

            {photoUri && <Preview source={{ uri: photoUri }} contentFit="cover" />}

            <PhotoOption
                icon="folder.fill"
                label={photoUri ? 'Choose another photo' : 'Attach photo from library'}
                height={60}
                onPress={() => choosePhoto(pickPhoto)}
            />
            <PhotoOption icon="camera.fill" label="Take picture" height={60} onPress={() => choosePhoto(takePhoto)} />
        </Screen>
    );
}