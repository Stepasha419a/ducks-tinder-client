import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { Button } from '@shared/ui';
import styles from './OuterPreview.module.scss';

interface OuterPreviewPropsInterface {
  slider: ReactElement;
  setIsFullPreview?:
    | Dispatch<SetStateAction<boolean>>
    | ((value: boolean) => void);
  extraClassName?: string;
  disabled?: boolean;
}

export const OuterPreview: FC<OuterPreviewPropsInterface> = ({
  slider,
  setIsFullPreview,
  extraClassName,
  disabled,
}) => {
  const cn = classNames(styles.preview, extraClassName);

  return (
    <div className={cn}>
      <div className={styles.slider}>{slider}</div>
      {!disabled && setIsFullPreview && (
        <div onClick={() => setIsFullPreview(true)} className={styles.descr}>
          <Button
            variant="mark"
            onClick={() => setIsFullPreview(true)}
            extraClassName={styles.openFullPreview}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Button>
        </div>
      )}
    </div>
  );
};
