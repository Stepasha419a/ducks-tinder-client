import { Skeleton } from '@shared/ui';

export const PairsListLazy = () => {
  return (
    <>
      {Array(6)
        .fill(null)
        .map((_, i) => {
          return (
            <Skeleton key={i} count={1} width={244} height={305} duration={1} />
          );
        })}
    </>
  );
};
