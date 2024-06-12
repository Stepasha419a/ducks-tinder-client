import type { PaginationParams } from '@shared/lib/interfaces';
import type { FullPicture, ShortUser, User } from '../../interfaces';
import type { AxiosResponse } from 'axios';

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
  getMatchUser(): Promise<AxiosResponse<ShortUser>>;
  updateUser(data: Partial<User>): Promise<AxiosResponse<User>>;
  updateUserPlace(
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse<User>>;
  savePicture(picture: Blob): Promise<AxiosResponse<User>>;
  deletePicture(id: string): Promise<AxiosResponse<User>>;
  mixPictures(pictureOrders: number[]): Promise<AxiosResponse<User>>;
  getPairs(params: PairFilterParams): Promise<AxiosResponse<ShortUser[]>>;
  getPairsInfo(): Promise<AxiosResponse<PairsInfo>>;
  acceptPair(pairId: string): Promise<AxiosResponse<string>>;
  deletePair(pairId: string): Promise<AxiosResponse<string>>;
  likeUser(userId: string): Promise<AxiosResponse<void>>;
  dislikeUser(userId: string): Promise<AxiosResponse<void>>;
  returnUser(): Promise<AxiosResponse<ShortUser>>;
}
