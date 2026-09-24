import { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from './button';

const Card = styled.View`
  gap: 10px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
`;

const NotesText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const NotesInput = styled.TextInput`
  min-height: 60px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.text};
`;

const EditLink = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

type NotesBoxProps = { notes?: string; onSave: (notes: string) => void };

export function NotesBox({ notes, onSave }: NotesBoxProps) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(notes ?? '');

    if (editing) {
        return (
            <Card>
                <NotesInput multiline autoFocus value={text} onChangeText={setText} accessibilityLabel="Notes" />
                <Actions>
                    <Button label="Cancel" variant="secondary" onPress={() => { setText(notes ?? ''); setEditing(false); }} />
                    <Button label="Save" onPress={() => { onSave(text.trim()); setEditing(false); }} />
                </Actions>
            </Card>
        );
    }

    return (
        <Card>
            <NotesText>{notes || 'No notes yet'}</NotesText>
            <EditLink accessibilityRole="button" onPress={() => setEditing(true)}>
                Edit
            </EditLink>
        </Card>
    );
}