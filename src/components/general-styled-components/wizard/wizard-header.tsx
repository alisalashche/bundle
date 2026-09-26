import { styled } from 'styled-components/native';
import { CenteredDescription, CenteredTitle } from '../typography';
import { WizardProgress } from './wizard-progress';

const Header = styled.View`
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const TitleBlock = styled.View`
  align-self: stretch;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

type WizardHeaderProps = { step: number; total: number; title: string; description?: string };

export function WizardHeader({ step, total, title, description }: WizardHeaderProps) {
    return (
        <Header>
            <WizardProgress current={step} total={total} />
            <TitleBlock>
                <CenteredTitle accessibilityRole="header">{title}</CenteredTitle>
                {description && <CenteredDescription>{description}</CenteredDescription>}
            </TitleBlock>
        </Header>
    );
}