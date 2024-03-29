import type { FC } from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ShortUser, User } from "@/shared/api/interfaces";
import { ListItem } from "@/shared/ui";
import { getUserSliderInfo } from "@/entities/user/lib";
import type { UserPlaceInfo } from "@/entities/user/lib/helpers/getUserSliderInfo";
import styles from "./SliderContent.module.scss";
import classNames from "classnames";

interface SliderContentProps {
  user: User | ShortUser;
  currentSlide: number;
}

export const SliderContent: FC<SliderContentProps> = ({
  user,
  currentSlide,
}) => {
  const info = getUserSliderInfo(user);

  const currentInfo = info[currentSlide];

  if (Array.isArray(currentInfo)) {
    return (
      <div className={classNames(styles.wrapper, styles.high)}>
        <div className={styles.person}>
          {user.name} <span className={styles.years}>{user.age}</span>
        </div>
        <div className={styles.items}>
          {currentInfo.map((item) => (
            <ListItem extraClassName={styles.listItem} key={item}>
              {item}
            </ListItem>
          ))}
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if ((currentInfo as UserPlaceInfo)?.place) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.person}>
          {user.name} <span className={styles.years}>{user.age}</span>
        </div>
        <div className={styles.place}>
          <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          <span className={styles.name}>
            Lives in&nbsp;
            {user.place?.name || "unknown place"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.person}>
        {user.name} <span className={styles.years}>{user.age}</span>
      </div>
    </div>
  );
};
