import { styled } from 'styled-components/native';

const Steps = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const Step = styled.View<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radius.full}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.lightGray)};
`;

const StepText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.grey)};
`;

type WizardProgressProps = { current: number; total: number };

export function WizardProgress({ current, total }: WizardProgressProps) {
    const steps = Array.from({ length: total }, (_, index) => index + 1);
    return (
        <Steps accessibilityLabel={`Step ${current} of ${total}`}>
            {steps.map((step) => (
                <Step key={step} $active={step <= current}>
                    <StepText $active={step <= current}>{step}</StepText>
                </Step>
            ))}
        </Steps>
    );
}