import type { Dispatch, FC, SetStateAction } from 'react';

import type { Picture } from '@ducks-tinder-client/common';
import {
  createEmptyArray,
  deleteUserPictureThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';
import { makeImageUrl } from '@ducks-tinder-client/ui';

import { Card, DraggableCard } from './ui';
import * as styles from './PicturesDND.module.scss';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

interface PicturesDNDProps {
  pictures: Picture[];
  setPictures: Dispatch<SetStateAction<Picture[]>>;
  handleOpenUpload: () => void;
}

export const PicturesDND: FC<PicturesDNDProps> = ({
  pictures,
  setPictures,
  handleOpenUpload,
}) => {
  const dispatch = useAppDispatch();

  const handleDeletePicture = (id: string): void => {
    dispatch(deleteUserPictureThunk(id));
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
          const { initialIndex, index } = source;

          if (initialIndex !== index) {
            setPictures((items) => {
              const newItems = [...items];
              const [removed] = newItems.splice(initialIndex, 1);
              newItems.splice(index, 0, removed);

              return newItems;
            });
          }
        }
      }}
    >
      <div className={styles.pictures}>
        {pictures.map((picture) => {
          return (
            <DraggableCard
              key={picture.name}
              onDelete={() => handleDeletePicture(picture.id)}
              picture={picture}
              src={makeImageUrl(picture.name)}
            />
          );
        })}
        {createEmptyArray(9 - pictures.length).map((_, i) => {
          return <Card key={i} onAdd={handleOpenUpload} />;
        })}
      </div>
    </DragDropProvider>
  );
};
