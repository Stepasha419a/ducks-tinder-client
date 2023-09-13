import { PairsSortPopup, SortPairsItems } from '@features/user';
import { useState } from 'react';

export const SortPairs = () => {
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);

  return (
    <>
      <SortPairsItems
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
      />
      {isSortPopupOpen && (
        <PairsSortPopup setIsSortPopupOpen={setIsSortPopupOpen} />
      )}
    </>
  );
};
