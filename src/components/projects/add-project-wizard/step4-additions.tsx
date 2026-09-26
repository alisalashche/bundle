import { Button } from '@/components/general-styled-components/buttons/button';
import { Section } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { LinkButton } from '@/components/general-styled-components/navigation/grey-button';
import { Label } from '@/components/general-styled-components/typography';
import { TextField } from '@/components/general-styled-components/wizard/field';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import { useProjectStore } from '@/hooks/use-project-store';
import { pickPhotos } from '@/utils/images';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { styled } from 'styled-components/native';

const Thumbs = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const Thumb = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
`;

export function AdditionsStep() {
    const draft = useProjectDraftStore((state) => state.draft);
    const setField = useProjectDraftStore((state) => state.setField);
    const goTo = useProjectDraftStore((state) => state.goTo);
    const addProject = useProjectStore((state) => state.addProject);

    const addPhotos = async () => {
        const uris = await pickPhotos();
        if (uris.length) setField('referencePhotos', [...draft.referencePhotos, ...uris]);
    };

    const save = () => {
        const id = addProject({
            name: draft.name.trim(),
            craft: draft.craft,
            difficulty: draft.difficulty,
            yarnNeeded: Number(draft.yarnNeeded),
            hookNeedleSize: draft.hookNeedleSize || undefined,
            stitches: draft.stitches || undefined,
            tutorialUrl: draft.tutorialUrl || undefined,
            yarnIds: draft.yarnIds,
            steps: draft.steps,
            notes: draft.notes.trim() || undefined,
            referencePhotos: draft.referencePhotos,
        });
        router.back(); // close the wizard
        router.push(`/projects/${id}`); // open the new project
    };

    return (
        <Screen footer={<Button label="Add project" onPress={save} />}>
            <BackButton onPress={() => goTo(3)} />
            <WizardHeader
                step={4}
                total={4}
                title="Add additional materials"
                description="Add your pattern, tutorials, references, notes, list of extra materials etc."
            />

            <TextField
                label="Notes"
                multiline
                style={{ minHeight: 93 }}
                value={draft.notes}
                onChangeText={(value) => setField('notes', value)}
            />

            <Section>
                <Label>Photos (Optional)</Label>
                <LinkButton variant="photo" icon="folder.fill" label="Attach photo from library" onPress={addPhotos} />
            </Section>

            {draft.referencePhotos.length > 0 && (
                <Thumbs>
                    {draft.referencePhotos.map((uri) => (
                        <Thumb key={uri} source={{ uri }} contentFit="cover" />
                    ))}
                </Thumbs>
            )}
        </Screen>
    );
}