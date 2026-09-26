import { Badge } from '@/components/general-styled-components/badge';
import { Button } from '@/components/general-styled-components/buttons/button';
import { LinkButton } from '@/components/general-styled-components/buttons/grey-button';
import { IconButton } from '@/components/general-styled-components/buttons/icon-button';
import { TextField } from '@/components/general-styled-components/inputs/field';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { BackButton } from '@/components/general-styled-components/navigation/back-button';
import { WizardHeader } from '@/components/general-styled-components/wizard/wizard-header';
import { cardShadow } from '@/constants/shadow';
import { useProjectDraftStore } from '@/hooks/use-project-draft-store';
import { ProjectStep } from '@/types/project';
import { useState } from 'react';
import { styled } from 'styled-components/native';

const StepCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  ${cardShadow}
`;

const StepContent = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StepTop = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StepTitle = styled.Text`
  flex-shrink: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

const StepText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.grey};
`;

const FormCard = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
`;

const FormActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const emptyForm = { title: '', target: '', description: '' };

export function ChecklistStep() {
    const steps = useProjectDraftStore((state) => state.draft.steps);
    const { addStep, updateStep, removeStep, goTo } = useProjectDraftStore.getState();

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formOpen, setFormOpen] = useState(steps.length === 0);

    const [showError, setShowError] = useState(false);

    const openEdit = (step: ProjectStep) => {
        setForm({ title: step.title, target: step.target ?? '', description: step.description ?? '' });
        setEditingId(step.id);
        setFormOpen(true);
    };

    const closeEdit = () => {
        setForm(emptyForm);
        setEditingId(null);
        setFormOpen(false);
        setShowError(false);
    };

    const save = () => {
        if (!form.title.trim()) {
            setShowError(true);
            return;
        }
        const values = {
            title: form.title.trim(),
            target: form.target.trim() || undefined,
            description: form.description.trim() || undefined,
        };
        if (editingId) updateStep(editingId, values);
        else addStep(values);
        closeEdit();
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
                    <IconButton icon="line.3.horizontal" label="Reorder (coming soon)" />
                    <StepContent>
                        <StepTop>
                            <StepTitle numberOfLines={1}>
                                {index + 1}. {step.title}
                            </StepTitle>
                            {step.target &&
                                <Badge label={`Target: ${step.target}`}></Badge>}
                        </StepTop>
                        {step.description && <StepText>{step.description}</StepText>}
                    </StepContent>
                    <IconButton icon="square.and.pencil" label={`Edit ${step.title}`} onPress={() => openEdit(step)} />
                </StepCard>
            ))}
            {formOpen ? (
                <FormCard>
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
                        multiline
                        placeholder="Use long-tail cast on with your main yarn."
                        value={form.description}
                        onChangeText={(description) => setForm({ ...form, description })}
                    />
                    <FormActions>
                        <Button label="Save" size="sm" onPress={save} />
                        {editingId && (
                            < IconButton
                                icon="trash"
                                label={`Delete`}
                                onPress={() => {
                                    removeStep(editingId);
                                    closeEdit();
                                }}
                            />
                        )}
                    </FormActions>
                </FormCard>
            ) : (
                <LinkButton variant='add-link' icon='plus' label="Add another step" onPress={() => setFormOpen(true)} />
            )}
        </Screen>
    );
}