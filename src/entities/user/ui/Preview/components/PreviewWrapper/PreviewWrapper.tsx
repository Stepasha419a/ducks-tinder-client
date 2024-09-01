import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import type { ShortUser, ShortUserWithoutDistance, User } from '@shared/api';
import { FullPreview, OuterPreview } from './components';

interface PreviewWrapperProps {
  user: User | ShortUser | ShortUserWithoutDistance;
  slider: ReactElement;
  setIsFullPreview?:
    | Dispatch<SetStateAction<boolean>>
    | ((value: boolean) => void);
  isFull?: boolean;
  extraContent?: ReactElement;
  extraClassName?: string;
  disabled?: boolean;
}

export const PreviewWrapper: FC<PreviewWrapperProps> = ({
  user,
  slider,
  setIsFullPreview,
  isFull = false,
  extraContent,
  extraClassName,
  disabled,
}) => {
  if (isFull) {
    return (
      <FullPreview
        user={user}
        slider={slider}
        setIsFullPreview={setIsFullPreview}
        extraClassName={extraClassName}
        extraContent={extraContent}
      />
    );
  }

  return (
    <OuterPreview
      slider={slider}
      disabled={disabled}
      extraClassName={extraClassName}
      setIsFullPreview={setIsFullPreview}
    />
  );
};
