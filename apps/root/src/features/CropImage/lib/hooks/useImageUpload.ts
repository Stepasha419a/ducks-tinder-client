import { useOpenModal } from '@ducks-tinder-client/ui';
import { saveUserImageThunk } from '@entities/user';
import type { CropImageProps, CropImageResult } from '@features/CropImage';
import { CropImage } from '@features/CropImage';
import type { DialogUploadResult } from '@features/DialogUpload';
import { DialogUpload } from '@features/DialogUpload';
import { useAppDispatch } from '@shared/lib';

export function useImageUpload() {
  const dispatch = useAppDispatch();
  const { openModal } = useOpenModal();

  const handleUploadImage = async () => {
    const imageUrl = await openModal<never, DialogUploadResult>({
      Component: DialogUpload,
    });
    if (imageUrl === null) {
      return;
    }

    const image = await openModal<CropImageProps, CropImageResult>({
      Component: CropImage,
      props: { imageUrl },
    });
    if (image === null) {
      return;
    }

    dispatch(saveUserImageThunk(image));
  };

  return { handleUploadImage };
}
