import type { Dispatch, FC, KeyboardEvent, SetStateAction } from 'react';
import { Textarea } from '@shared/ui';
import { useSelectMessageEdit } from '../lib';
import styles from './EditMessage.module.scss';

interface EditMessageProps {
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
}

export const EditMessage: FC<EditMessageProps> = ({
  editingValue,
  setEditingValue,
}) => {
  const { handleSaveMessage } = useSelectMessageEdit();

  const handleSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSaveMessage(editingValue);
    }
  };

  return (
    <Textarea
      onChange={(e) => setEditingValue(e.target.value)}
      onKeyDown={handleSubmit}
      value={editingValue}
      extraClassName={styles.textarea}
    />
  );
};
