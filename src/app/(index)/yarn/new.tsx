import { Button } from '@/components/general-styled-components/buttons/button';
import { Tag } from '@/components/general-styled-components/buttons/tag';
import { Half, Row } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { LinkButton } from '@/components/general-styled-components/navigation/grey-button';
import { Label } from '@/components/general-styled-components/typography';
import { TagsGroup, TagsRow, TextField } from '@/components/general-styled-components/wizard/field';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import styled from 'styled-components/native';

import { useYarnStore } from '@/hooks/use-yarn-store';
import type { YarnType } from '@/types/yarn';
import { pickPhoto, takePhoto } from '@/utils/images';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';

//Styled component
const Preview = styled(Image)`
  width: 100%;
  height: 260px;
  border-radius: ${({ theme }) => theme.radius.md}px;
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

type Errors = Partial<Record<keyof Form, string>>;

const validate = (form: Form): Errors => {
    const errors: Errors = {};
    if (!form.name.trim()) errors.name = 'Add the brand or name from the label';
    if (!form.material.trim()) errors.material = 'Add the material(s)';
    if (!(Number(form.lengthM) > 0)) errors.lengthM = 'Enter the length in meters';
    if (!(Number(form.weightG) > 0)) errors.weightG = 'Enter the weight in grams';
    if (!(Number(form.quantity) >= 1)) errors.quantity = 'How many do you have?';
    return errors;
};

export default function NewYarnScreen() {
    const addYarn = useYarnStore((state) => state.addYarn);
    const [step, setStep] = useState<1 | 2>(1);
    const [form, setForm] = useState<Form>({
        name: '', material: '', lengthM: '', weightG: '',
        hookSize: '', needleSize: '', shop: '', quantity: '1',
    });

    //For errors
    const [showErrors, setShowErrors] = useState(false);
    const errors = validate(form);
    const isValid = Object.keys(errors).length === 0;

    // Returns the two props every field needs, so we can spread them: {...bind('name')}
    const bind = (key: keyof Form) => ({
        value: form[key],
        onChangeText: (value: string) => setForm({ ...form, [key]: value }),
        error: showErrors ? errors[key] : undefined,
    });

    //For photoss
    const [type, setType] = useState<YarnType>('skeins');
    const [photoUri, setPhotoUri] = useState<string>();

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
                        onPress={() => {
                            if (!isValid) {
                                setShowErrors(true);
                                return;
                            }
                            setStep(2);
                        }} />
                }
            >
                <BackButton label="Cancel" />
                <WizardHeader step={1} total={2} title="Label information" />

                <TextField label="Brand/Name" required placeholder="Cozy 100% wool" {...bind('name')} />

                <TagsGroup>
                    <Label>Type</Label>
                    <TagsRow>
                        {yarnTypes.map((option) => (
                            <Tag key={option} label={option} selected={type === option} onPress={() => setType(option)} />
                        ))}
                    </TagsRow>
                </TagsGroup>

                <Row>
                    <Half>
                        <TextField label="Material" required placeholder="Wool" {...bind('material')} />
                    </Half>
                    <Half>
                        <TextField label="Quantity you have" required keyboardType="number-pad" {...bind('quantity')} />
                    </Half>
                </Row>

                <Row>
                    <Half>
                        <TextField label="Length (m)" required placeholder="150" keyboardType="number-pad" {...bind('lengthM')} />
                    </Half>
                    <Half>
                        <TextField label="Weight (g)" required placeholder="50" keyboardType="number-pad" {...bind('weightG')} />
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
            <BackButton onPress={() => setStep(1)} />
            <WizardHeader step={2} total={2} title="Add picture" />

            {photoUri && <Preview source={{ uri: photoUri }} contentFit="cover" />}

            <LinkButton
                variant="photo"
                icon="folder.fill"
                label={photoUri ? 'Choose another photo' : 'Attach photo from library'}
                onPress={() => choosePhoto(pickPhoto)}
            />
            <LinkButton variant="photo" icon="camera.fill" label="Take picture" onPress={() => choosePhoto(takePhoto)} />
        </Screen>
    );
}