import { Skeleton } from "@/shared/ui";
import type { FC } from "react";
import styles from "./Loading.module.scss";

export const Loading: FC = () => {
  return (
    <Skeleton
      className={styles.loading}
      width={104}
      height={120}
      borderRadius={4}
    />
  );
};
