import type { TextInputProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Label } from './typography';

const Field = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const RequiredMark = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.TextInput<{ $invalid: boolean }>`
  padding: 12px;
  border-width: 1px;
  border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.caption}px;
  color: ${({ theme }) => theme.colors.primary};
`;

type TextFieldProps = TextInputProps & {
    label: string;
    required?: boolean;
    error?: string;
};

export function TextField({ label, required = false, error, ...inputProps }: TextFieldProps) {
    const theme = useTheme();
    return (
        <Field>
            <Label>
                {label}
                {required && <RequiredMark> *</RequiredMark>}
            </Label>
            <Input
                accessibilityLabel={required ? `${label}, required` : label}
                placeholderTextColor={theme.colors.textSubtle}
                $invalid={Boolean(error)}
                {...inputProps}
            />
            {error && <ErrorText accessibilityLiveRegion="polite">{error}</ErrorText>}
        </Field>
    );
}