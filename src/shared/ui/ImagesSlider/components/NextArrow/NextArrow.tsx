import type { CSSProperties, MouseEventHandler } from 'react';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NextArrow = (props: Record<string | number | symbol, unknown>) => {
  const { style, onClick } = props;
  return (
    <div
      className={'nextArrowWrapper'}
      style={style as CSSProperties | undefined}
      onClick={onClick as MouseEventHandler<HTMLDivElement> | undefined}
    >
      <FontAwesomeIcon icon={faAngleRight} className={'nextArrow'} />
    </div>
  );
};
