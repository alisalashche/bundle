import type { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { Label } from './typography';

const Field = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Input = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.textSubtle,
}))`
  padding: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.text};
`;

type TextFieldProps = TextInputProps & { label: string };

export function TextField({ label, ...inputProps }: TextFieldProps) {
    return (
        <Field>
            <Label>{label}</Label>
            <Input accessibilityLabel={label} {...inputProps} />
        </Field>
    );
}