import type { CSSProperties, MouseEventHandler } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PrevArrow = (props: Record<string | number | symbol, unknown>) => {
  const { style, onClick } = props;
  return (
    <div
      className={'prevArrowWrapper'}
      style={style as CSSProperties | undefined}
      onClick={onClick as MouseEventHandler<HTMLDivElement> | undefined}
    >
      <FontAwesomeIcon icon={faAngleLeft} className={'prevArrow'} />
    </div>
  );
};
