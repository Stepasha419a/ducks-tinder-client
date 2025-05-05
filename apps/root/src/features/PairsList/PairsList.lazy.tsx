import { PairLazy } from './ui';

export const PairsListLazy = () => {
  return (
    <>
      {Array(5)
        .fill(null)
        .map((_, i) => {
          return <PairLazy key={i} />;
        })}
    </>
  );
};
