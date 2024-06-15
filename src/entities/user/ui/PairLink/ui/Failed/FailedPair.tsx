import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import styles from "./FailedPair.module.scss";

export const FailedPair: FC = () => {
  return (
    <div className={styles.noPairs}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      <div>You don't have likes. Like someone to have a like too</div>
    </div>
  );
};
