import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NextArrowProps {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NextArrow: React.FC<NextArrowProps> = ({ onClick, style }) => (
  <button
    aria-label="next image"
    className={'nextArrowWrapper'}
    style={style}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faAngleRight} className={'nextArrow'} />
  </button>
);
