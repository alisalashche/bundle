import type { TextInputProps } from 'react-native';
import { useTheme, styled } from 'styled-components/native';
import { ErrorText, Label } from '../typography';

// Tag fields
export const TagsGroup = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

//Text fields
const FieldGroup = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const RequiredMark = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.TextInput<{ $invalid: boolean; $multiline: boolean }>`
  min-height: ${({ $multiline }) => ($multiline ? 75 : 0)}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: 1px;
  border-color: ${({ theme, $invalid }) => ($invalid ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs}px;
  color: ${({ theme }) => theme.colors.black};
  text-align-vertical: top;
`;

type TextFieldProps = TextInputProps & { label: string; required?: boolean; error?: string };

export function TextField({ label, required = false, error, multiline = false, ...inputProps }: TextFieldProps) {
  const theme = useTheme();
  return (
    <FieldGroup>
      <Label>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </Label>
      <Input
        accessibilityLabel={required ? `${label}, required` : label}
        placeholderTextColor={theme.colors.grey}
        multiline={multiline}
        $multiline={multiline}
        $invalid={Boolean(error)}
        {...inputProps}
      />
      {error && <ErrorText accessibilityLiveRegion="polite">{error}</ErrorText>}
    </FieldGroup>
  );
}