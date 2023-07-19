import type { Dispatch, FC, SetStateAction } from 'react';
import { Textarea } from '@shared/ui';
import styles from './EditMessage.module.scss';

interface EditMessageProps {
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
}

export const EditMessage: FC<EditMessageProps> = ({
  editingValue,
  setEditingValue,
}) => {
  return (
    <Textarea
      onChange={(e) => setEditingValue(e.target.value)}
      value={editingValue}
      extraClassName={styles.textarea}
    />
  );
};
