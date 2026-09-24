import { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from './button';

const Card = styled.View`
  padding: 10px 15px;
  gap: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;


const NotesText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.black};
`;

const NotesInput = styled.TextInput`
  min-height: 60px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  color: ${({ theme }) => theme.colors.text};
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
  gap: 5px;
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
                    <Button label="Save" size="sm" onPress={() => { onSave(text.trim()); setEditing(false); }} />
                    <Button label="Cancel" size="sm" variant="dark" onPress={() => { setText(notes ?? ''); setEditing(false); }} />
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