import { Button } from '@/components/general-styled-components/buttons/button';
import { IconButton } from '@/components/general-styled-components/buttons/icon-button';
import { YarnCard } from '@/components/general-styled-components/layout/cards/yarn-card';
import { Grid } from '@/components/general-styled-components/layout/cards/card';
import { Section } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { LinkButton } from '@/components/general-styled-components/navigation/grey-button';
import { CenteredDescription, Description, ErrorText, Label } from '@/components/general-styled-components/typography';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import { useYarnStore } from '@/hooks/use-yarn-store';
import type { Yarn } from '@/types/yarn';
import { router } from 'expo-router';
import { useState } from 'react';
import { styled } from 'styled-components/native';

const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
`;

const QuantityInfo = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const QuantityValue = styled.Text`
  min-width: 24px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.black};
`;

export function YarnStep() {
    const yarns = useYarnStore((state) => state.yarns);
    const assigned = useProjectDraftStore((state) => state.draft.yarn);
    const toggleYarn = useProjectDraftStore((state) => state.toggleYarn);
    const setYarnQuantity = useProjectDraftStore((state) => state.setYarnQuantity);
    const goTo = useProjectDraftStore((state) => state.goTo);
    const [limitYarnId, setLimitYarnId] = useState<string | null>(null);

    const available = yarns.filter((yarn) => !yarn.archived);
    const isSelected = (yarnId: string) => assigned.some((item) => item.yarnId === yarnId);

    const changeQuantity = (yarn: Yarn, current: number, delta: number) => {
        const next = current + delta;
        if (next > yarn.quantity) {
            setLimitYarnId(yarn.id); // not enough in the stash
            return;
        }
        setLimitYarnId(null);
        if (next < 1) {
            toggleYarn(yarn.id); // going below 1 removes the yarn
            return;
        }
        setYarnQuantity(yarn.id, next);
    };

    return (
        <Screen footer={<Button label="Next" align="flex-end" onPress={() => goTo(3)} />}>
            <BackButton onPress={() => goTo(1)} />
            <WizardHeader step={2} total={4} title="Assign yarn" description="Add or assign available yarn from your stash." />

            {available.length === 0 ? (
                <CenteredDescription>Your stash is empty. Add your first yarn below.</CenteredDescription>
            ) : (
                <Grid size='small' >
                    {available.map((yarn) => (
                        <YarnCard
                            key={yarn.id}
                            yarn={yarn}
                            selected={isSelected(yarn.id)}
                            onPress={() => toggleYarn(yarn.id)}
                        />
                    ))}
                </Grid>
            )}

            {assigned.length > 0 && (
                <Section>
                    <Label>How much of each?</Label>
                    {assigned.map((item) => {
                        const yarn = available.find((entry) => entry.id === item.yarnId);
                        if (!yarn) return null;
                        return (
                            <QuantityRow key={item.yarnId}>
                                <QuantityInfo>
                                    <Label numberOfLines={1}>{yarn.name}</Label>
                                    <Description>
                                        {yarn.quantity} {yarn.type} in your stash
                                    </Description>
                                    {limitYarnId === yarn.id && (
                                        <ErrorText accessibilityLiveRegion="polite">
                                            Not enough yarn: you only have {yarn.quantity}.
                                        </ErrorText>
                                    )}
                                </QuantityInfo>
                                <IconButton icon="minus" label={`Less ${yarn.name}`} onPress={() => changeQuantity(yarn, item.quantity, -1)} />
                                <QuantityValue>{item.quantity}</QuantityValue>
                                <IconButton icon="plus" label={`More ${yarn.name}`} onPress={() => changeQuantity(yarn, item.quantity, 1)} />
                            </QuantityRow>
                        );
                    })}
                </Section>
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