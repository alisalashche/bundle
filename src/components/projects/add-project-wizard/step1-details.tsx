import { Button } from '@/components/general-styled-components/buttons/button';
import { Tag } from '@/components/general-styled-components/buttons/tag';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { Label } from '@/components/general-styled-components/typography';
import { TagsGroup, TagsRow, TextField } from '@/components/general-styled-components/wizard/field';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import type { Craft, Difficulty } from '@/types/project';
import { useState } from 'react';

const crafts: { value: Craft; label: string }[] = [
    { value: 'knitting', label: 'Knitting' },
    { value: 'crochet', label: 'Crochet' },
];

const difficulties: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'normal', label: 'Normal' },
    { value: 'difficult', label: 'Difficult' },
];

export function DetailsStep() {
    const draft = useProjectDraftStore((state) => state.draft);
    const setField = useProjectDraftStore((state) => state.setField);
    const goTo = useProjectDraftStore((state) => state.goTo);
    const [showErrors, setShowErrors] = useState(false);

    const errors = {
        name: draft.name.trim() ? undefined : 'Give your project a name',
        yarnNeeded: Number(draft.yarnNeeded) >= 1 ? undefined : 'How many skeins does the pattern need?',
        hookNeedleSize: Number(draft.hookNeedleSize) >= 1 ? undefined : 'Enter hook/needles size needed for this project',
    };
    const isValid = !errors.name && !errors.yarnNeeded;

    const next = () => {
        if (!isValid) {
            setShowErrors(true);
            return;
        }
        goTo(2);
    };

    return (
        <Screen footer={<Button label="Next" align="flex-end" onPress={next} />}>
            <BackButton label="Cancel" />
            <WizardHeader step={1} total={4} title="Tell about project" />

            <TagsGroup>
                <Label>Type:</Label>
                <TagsRow>
                    {crafts.map((craft) => (
                        <Tag
                            key={craft.value}
                            label={craft.label}
                            selected={draft.craft === craft.value}
                            onPress={() => setField('craft', craft.value)}
                        />
                    ))}
                </TagsRow>
            </TagsGroup>

            <TextField
                label="Name"
                required
                placeholder="Cozy bulky sweater"
                value={draft.name}
                onChangeText={(value) => setField('name', value)}
                error={showErrors ? errors.name : undefined}
            />
            <TextField
                label="Yarn quantity"
                required
                placeholder="8"
                keyboardType="number-pad"
                value={draft.yarnNeeded}
                onChangeText={(value) => setField('yarnNeeded', value)}
                error={showErrors ? errors.yarnNeeded : undefined}
            />
            <TextField
                label="Hook/Needles size"
                required
                placeholder="4"
                keyboardType="decimal-pad"
                value={draft.hookNeedleSize}
                onChangeText={(value) => setField('hookNeedleSize', value)}
                error={showErrors ? errors.hookNeedleSize : undefined}
            />
            <TextField
                label="Stitches"
                placeholder="Stockinette, 1x1 ribbing"
                value={draft.stitches}
                onChangeText={(value) => setField('stitches', value)}
            />
            <TextField
                label="Link to pattern/tutorial"
                placeholder="https://..."
                keyboardType="url"
                autoCapitalize="none"
                value={draft.tutorialUrl}
                onChangeText={(value) => setField('tutorialUrl', value)}
            />
            <TagsGroup>
                <Label>Difficulty:</Label>
                <TagsRow>
                    {difficulties.map((level) => (
                        <Tag
                            key={level.value}
                            label={level.label}
                            selected={draft.difficulty === level.value}
                            onPress={() => setField('difficulty', level.value)}
                        />
                    ))}
                </TagsRow>
            </TagsGroup>
        </Screen>
    );
}