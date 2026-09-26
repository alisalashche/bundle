import { AddButton } from '@/components/general-styled-components/buttons/add-button';
import { Button } from '@/components/general-styled-components/buttons/button';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { TextField } from '@/components/general-styled-components/wizard/field';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { cardShadow } from '@/constants/shadow';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { styled, useTheme } from 'styled-components/native';

const StepCard = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  ${cardShadow}
`;

const StepBody = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const StepTop = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

const StepTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

const Badge = styled.Text`
  padding: 4px 10px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const StepText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const emptyForm = { title: '', target: '', description: '' };

export function ChecklistStep() {
    const theme = useTheme();
    const steps = useProjectDraftStore((state) => state.draft.steps);
    const addStep = useProjectDraftStore((state) => state.addStep);
    const removeStep = useProjectDraftStore((state) => state.removeStep);
    const goTo = useProjectDraftStore((state) => state.goTo);
    const [form, setForm] = useState(emptyForm);
    const [showError, setShowError] = useState(false);

    const add = () => {
        if (!form.title.trim()) {
            setShowError(true);
            return;
        }
        addStep({
            title: form.title.trim(),
            target: form.target.trim() || undefined,
            description: form.description.trim() || undefined,
        });
        setForm(emptyForm);
        setShowError(false);
    };

    return (
        <Screen footer={<Button label="Next" align="flex-end" onPress={() => goTo(4)} />}>
            <BackButton onPress={() => goTo(2)} />
            <WizardHeader
                step={3}
                total={4}
                title="Add steps"
                description="Plan your project step by step to easily track your progress later."
            />

            {steps.map((step, index) => (
                <StepCard key={step.id}>
                    <StepBody>
                        <StepTop>
                            <StepTitle>
                                {index + 1}. {step.title}
                            </StepTitle>
                            {step.target && <Badge>Target: {step.target}</Badge>}
                        </StepTop>
                        {step.description && <StepText>{step.description}</StepText>}
                    </StepBody>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${step.title}`}
                        hitSlop={10}
                        onPress={() => removeStep(step.id)}
                    >
                        <SymbolView name="trash" size={16} tintColor={theme.colors.darkGrey} />
                    </Pressable>
                </StepCard>
            ))}

            <TextField
                label="Step name"
                required
                placeholder="Cast on"
                value={form.title}
                onChangeText={(title) => setForm({ ...form, title })}
                error={showError && !form.title.trim() ? 'Name the step first' : undefined}
            />
            <TextField
                label="Target"
                placeholder="120 stitches"
                value={form.target}
                onChangeText={(target) => setForm({ ...form, target })}
            />
            <TextField
                label="Description"
                placeholder="Use long-tail cast on with your main yarn."
                multiline
                value={form.description}
                onChangeText={(description) => setForm({ ...form, description })}
            />
            <AddButton label={steps.length ? 'Add another step' : 'Add step'} onPress={add} />
        </Screen>
    );
}