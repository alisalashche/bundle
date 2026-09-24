import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.View<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
`;

const DotText = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.textSubtle)};
`;

type StepIndicatorProps = { current: number; total: number };

export function StepIndicator({ current, total }: StepIndicatorProps) {
    const steps = Array.from({ length: total }, (_, index) => index + 1);
    return (
        <Row accessibilityLabel={`Step ${current} of ${total}`}>
            {steps.map((step) => (
                <Dot key={step} $active={step <= current}>
                    <DotText $active={step <= current}>{step}</DotText>
                </Dot>
            ))}
        </Row>
    );
}