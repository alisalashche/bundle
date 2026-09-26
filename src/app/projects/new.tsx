import { DetailsStep } from '@/components/projects/add-project-wizard/step1-details';
import { YarnStep } from '@/components/projects/add-project-wizard/step2-yarn';
import { ChecklistStep } from '@/components/projects/add-project-wizard/step3-checklist';
import { AdditionsStep } from '@/components/projects/add-project-wizard/step4-additions';

import { useProjectDraftStore } from '@/hooks/use-project-draft-store';

export default function NewProjectScreen() {
    const step = useProjectDraftStore((state) => state.step);

    if (step === 1) return <DetailsStep />;
    if (step === 2) return <YarnStep />;
    if (step === 3) return <ChecklistStep />;
    return <AdditionsStep />;
}