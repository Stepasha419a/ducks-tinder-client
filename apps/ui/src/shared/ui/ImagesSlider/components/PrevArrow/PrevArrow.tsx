import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PrevArrowProps {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrevArrow: React.FC<PrevArrowProps> = ({ onClick, style }) => (
  <button
    aria-label="previous image"
    className={'prevArrowWrapper'}
    style={style}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faAngleLeft} className={'prevArrow'} />
  </button>
);
