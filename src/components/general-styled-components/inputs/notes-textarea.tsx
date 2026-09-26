import { useState } from 'react';
import { styled } from 'styled-components/native';
import { Button } from '../buttons/button';

const Container = styled.Pressable`
  min-height: 64px;
  flex-direction: row;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const NotesText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.grey};
`;

const NotesInput = styled.TextInput`
  min-height: 60px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const EditLink = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

type NotesBoxProps = { notes?: string; onSave: (notes: string) => void };

export function NotesBox({ notes, onSave }: NotesBoxProps) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(notes ?? '');

    if (editing) {
        return (
            <Container>
                <NotesInput multiline autoFocus value={text} onChangeText={setText} accessibilityLabel="Notes" />
                <Actions>
                    <Button label="Save" size="sm" onPress={() => { onSave(text.trim()); setEditing(false); }} />
                    <Button label="Cancel" size="sm" variant="secondary" onPress={() => { setText(notes ?? ''); setEditing(false); }} />
                </Actions>
            </Container>
        );
    }

    return (
        <Container>
            <NotesText>{notes || 'No notes yet'}</NotesText>
            <EditLink accessibilityRole="button" onPress={() => setEditing(true)}>
                Edit
            </EditLink>
        </Container>
    );
}