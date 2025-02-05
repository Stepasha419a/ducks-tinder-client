import type { AxiosResponse } from 'axios';
import type { PaginationParams } from '@shared/lib';
import type { FullPicture, ShortUser, User } from '../../interfaces';

export interface PairFilterParams extends PaginationParams {
  distance?: number;
  ageFrom?: number;
  ageTo?: number;
  pictures?: number;
  interests?: string[];
  hasInterests?: boolean;
  identifyConfirmed?: boolean;
}

export type ChangedData = string | string[] | number | boolean;

export interface PairsInfo {
  count: number;
  picture: FullPicture | null;
}

export interface UserService {
  getMe(): Promise<AxiosResponse<User>>;
  getMatchUsers(
    take: number,
    skipUserIds?: string[]
  ): Promise<AxiosResponse<ShortUser[]>>;
  updateUser(data: Partial<User>): Promise<AxiosResponse<User>>;
  updateUserPlace(
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse<User>>;
  savePicture(picture: Blob): Promise<AxiosResponse<User>>;
  deletePicture(id: string): Promise<AxiosResponse<User>>;
  mixPictures(pictureOrders: number[]): Promise<AxiosResponse<User>>;
  getPairs(
    params: PairFilterParams,
    abortPrevious?: boolean
  ): Promise<AxiosResponse<ShortUser[]>>;
  getPairsInfo(): Promise<AxiosResponse<PairsInfo>>;
  acceptPair(pairId: string): Promise<AxiosResponse<ShortUser>>;
  deletePair(pairId: string): Promise<AxiosResponse<ShortUser>>;
  likeUser(userId: string): Promise<AxiosResponse<ShortUser>>;
  dislikeUser(userId: string): Promise<AxiosResponse<ShortUser>>;
  returnUser(): Promise<AxiosResponse<ShortUser>>;
}
