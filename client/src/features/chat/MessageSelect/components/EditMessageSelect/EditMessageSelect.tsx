import type { FC, MutableRefObject } from 'react';
import { faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styles from '../../MessageSelect.module.scss';
import { useSelectMessageEdit } from '@/features/chat/lib';

interface EditMessageSelectProps {
  selectRef: MutableRefObject<HTMLDivElement | null>;
  editingValue: string;
}

export const EditMessageSelect: FC<EditMessageSelectProps> = ({
  selectRef,
  editingValue,
}) => {
  const { handleCancelMessage, handleSaveMessage } = useSelectMessageEdit();

  return (
    <div ref={selectRef} className={styles.select}>
      <div
        onClick={() => handleSaveMessage(editingValue)}
        className={styles.item}
      >
        <p>Save</p>
        <FontAwesomeIcon className={styles.icon} icon={faFloppyDisk} />
      </div>
      <div
        onClick={handleCancelMessage}
        className={classNames(styles.item, styles.remove)}
      >
        <p>Cancel</p>
        <FontAwesomeIcon className={styles.icon} icon={faBan} />
      </div>
    </div>
  );
};
