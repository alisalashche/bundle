import { Button } from '@/components/general-styled-components/buttons/button';
import { YarnCard } from '@/components/general-styled-components/layout/cards/yarn-card';
import { GridSmall } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { LinkButton } from '@/components/general-styled-components/navigation/grey-button';
import { CenteredDescription } from '@/components/general-styled-components/typography';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import { useYarnStore } from '@/hooks/use-yarn-store';
import { router } from 'expo-router';

export function YarnStep() {
    const yarns = useYarnStore((state) => state.yarns);
    const yarnIds = useProjectDraftStore((state) => state.draft.yarnIds);
    const toggleYarn = useProjectDraftStore((state) => state.toggleYarn);
    const goTo = useProjectDraftStore((state) => state.goTo);
    const available = yarns.filter((yarn) => !yarn.archived);

    return (
        <Screen footer={<Button label="Next" align="flex-end" onPress={() => goTo(3)} />}>
            <BackButton onPress={() => goTo(1)} />
            <WizardHeader step={2} total={4} title="Assign yarn" description="Add or assign from available yarns." />

            {available.length === 0 ? (
                <CenteredDescription>Your stash is empty. Add your first yarn below.</CenteredDescription>
            ) : (
                <GridSmall>
                    {available.map((yarn) => (
                        <YarnCard
                            key={yarn.id}
                            yarn={yarn}
                            selected={yarnIds.includes(yarn.id)}
                            onPress={() => toggleYarn(yarn.id)}
                        />
                    ))}
                </GridSmall>
            )}

            <LinkButton
                variant="add-link"
                icon="plus"
                label="Add new yarn"
                onPress={() => router.push('/projects/new-yarn')}
            />
        </Screen>
    );
}