import { makeDataObject, makeQuerySortsObj } from './../models/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usersAPI } from '../api/usersApi';
import { imageInterface } from '../components/Profile/ProfileImageChange/ChangeImage/ChangeImage';
import { IUser, makeUserImagesObject } from '../models/IUser';
import { AxiosError } from 'axios';

interface INotification {
  id: number;
  type: string;
  text: string;
}

const usersReducer = createSlice({
  name: 'users',
  initialState: {
    currentUser: {} as IUser,
    notifications: [] as INotification[],
    pairs: [] as IUser[],
    tinderUsers: [] as IUser[],
    isReturnUser: false,
    requestedUsers: [] as string[],
    currentTinderUsersIndex: 0,
    isFailed: false,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    createNotification: (state, action) => {
      const notification: INotification = {
        id: Date.now(),
        type: action.payload.type,
        text: action.payload.text,
      };

      state.notifications = [...state.notifications, notification];
    },
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (item) => item.id === action.payload
      );
      const newNotifications = [...state.notifications];
      newNotifications.splice(index, 1);
      state.notifications = newNotifications;
    },
    setPairs: (state, action) => {
      state.pairs = action.payload;
    },
    setTinderUsers: (state, action) => {
      state.tinderUsers = [...state.tinderUsers, { ...action.payload }];
    },
    setIsReturnUser: (state, action) => {
      state.isReturnUser = action.payload;
    },
    setRequestedUsers: (state, action) => {
      state.requestedUsers = [...action.payload];
    },
    setCurrentTinderUsersIndex: (state, action) => {
      state.currentTinderUsersIndex = action.payload;
    },
    setIsFailed: (state, action) => {
      state.isFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPairsThunk.fulfilled, (state, action) => {
        // always returns an array
        if (Array.isArray(action.payload)) {
          if (
            state.pairs[0] &&
            state.pairs[0]?._id !== action.payload[0]?._id
          ) {
            state.pairs = [state.pairs[0], ...action.payload];
          } else {
            state.pairs = [...action.payload];
          }
        }
      })
      .addCase(deletePairThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload?.data;

        state.pairs.filter((pair) => pair._id !== action.payload?.deletedId);
      })
      .addCase(getSortedUserThunk.fulfilled, (state, { payload }) => {
        state.tinderUsers = [...state.tinderUsers, { ...payload }] as IUser[];
      })
      .addCase(getSortedUserThunk.rejected, (state) => {
        state.isFailed = true;
      });
    /* .addMatcher(
        (action) => action.type.endsWith('rejected'),
        (state, action) => {
          const signs = action.type.split('/');
          if (signs[0] === 'users' && signs[1] !== 'getSortedUser') {
            const notification: INotification = {
              id: Date.now(),
              type: 'error',
              text: action.payload,
            };
            state.notifications = [...state.notifications, notification];
          }
        }
      ); */
  },
});

export async function fetchUserById(id: string) {
  const response = await usersAPI.getCurrentUser(id);

  const user = await response.data;

  return user;
}

export const fetchUserPair = createAsyncThunk(
  'users/fetchUserPair',
  async function (id: string, { rejectWithValue }) {
    try {
      const user = await fetchUserById(id);

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.message);
      }
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const getSortedUserThunk = createAsyncThunk(
  'users/getSortedUser',
  async function (
    args: { user: IUser; requestedUsers?: string[] },
    { rejectWithValue }
  ) {
    try {
      const querySortsObj = makeQuerySortsObj(args.user, args.requestedUsers);

      const response = await usersAPI.getSortedUsers(querySortsObj);

      if (!response) {
        throw new Error("Can't get user. Server Error");
      }

      const data = await response.data;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(['unexpected error', error]);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (
    args: {
      currentUser: IUser;
      inputName: string;
      changedData:
        | String
        | Number
        | Boolean
        | String[]
        | { from: number; to: number };
      innerObjectName?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = makeDataObject(args);

      const response = await usersAPI.updateUser(args.currentUser._id, data);

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const getUserPairsThunk = createAsyncThunk(
  'users/getUserPairs',
  async (pairsId: string[], { rejectWithValue }) => {
    try {
      const pairs = [];
      for await (const pairId of pairsId) {
        const data = await fetchUserById(pairId);
        pairs.push(data);
      }

      return pairs;
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const likeUserThunk = createAsyncThunk(
  'users/likeUser',
  async (
    args: { currentUser: IUser; tinderUser: IUser },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = makeDataObject({
        currentUser: args.currentUser,
        inputName: 'checkedUsers',
        changedData: [...args.currentUser.checkedUsers, args.tinderUser._id],
      });

      const updateResponse = await usersAPI.updateUser(
        args.currentUser._id,
        data
      );

      const response = await usersAPI.createPair(
        args.tinderUser._id,
        args.currentUser._id
      );

      dispatch(
        setCurrentUser({
          ...updateResponse.data,
          checkedUsers: [...response.data.checkedUsers],
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const deletePairThunk = createAsyncThunk(
  'users/deletePair',
  async (
    args: { userId: string; deleteForUserId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersAPI.deletePair(
        args.userId,
        args.deleteForUserId
      );

      return { data: response.data, deletedId: args.deleteForUserId };
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const saveUserImage = createAsyncThunk(
  'users/saveUserImage',
  async (
    args: { picture: File; userId: string; setting: 'avatar' | 'gallery' },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await usersAPI.savePicture(
        args.picture,
        args.userId,
        args.setting
      );

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const deleteUserImage = createAsyncThunk(
  'users/deleteUserImage',
  async (
    args: {
      pictureName: string;
      userId: string;
      setting: 'avatar' | 'gallery';
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await usersAPI.deletePicture(
        args.pictureName,
        args.userId,
        args.setting
      );

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const mixUserImages = createAsyncThunk(
  'users/mixUserImages',
  async (
    args: { currentUser: IUser; images: imageInterface[] },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userImages = makeUserImagesObject(args);

      const response = await usersAPI.updateUser(
        args.currentUser._id,
        userImages
      );
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      if (error instanceof AxiosError) rejectWithValue(error.message);
      rejectWithValue(['unexpected error', error]);
    }
  }
);

export const {
  setCurrentUser,
  createNotification,
  deleteNotification,
  setPairs,
  setTinderUsers,
  setIsReturnUser,
  setRequestedUsers,
  setCurrentTinderUsersIndex,
  setIsFailed,
} = usersReducer.actions;

export type UsersReducerType = typeof usersReducer;

export default usersReducer.reducer;
